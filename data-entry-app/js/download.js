// js/download.js

// IndexedDB wrapper for storing the directory handle
const DB_NAME = 'SelfOS_DB';
const STORE_NAME = 'settings';

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = (e) => request.result.createObjectStore(STORE_NAME);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function getStoredHandle() {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const request = store.get('directoryHandle');
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    } catch (e) {
        return null; // DB failed or doesn't exist yet
    }
}

async function storeHandle(handle) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const request = handle ? store.put(handle, 'directoryHandle') : store.delete('directoryHandle');
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

async function verifyPermission(fileHandle) {
    const options = { mode: 'readwrite' };
    if ((await fileHandle.queryPermission(options)) === 'granted') return true;
    if ((await fileHandle.requestPermission(options)) === 'granted') return true;
    return false;
}

document.addEventListener('DOMContentLoaded', async () => {
    const btnDownload = document.getElementById('btn-download');
    const btnSelectFolder = document.getElementById('btn-select-folder');

    // Setup Folder UI on Load
    async function updateFolderUI() {
        if (!btnSelectFolder) return;
        const handle = await getStoredHandle();
        if (handle) {
            btnSelectFolder.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg> ${handle.name}`;
            btnSelectFolder.title = "Click to select a new folder or clear";
        } else {
            btnSelectFolder.innerHTML = `Default (Downloads)`;
            btnSelectFolder.title = "Select default save location";
        }
    }

    if (btnSelectFolder) {
        btnSelectFolder.addEventListener('click', async () => {
            const currentHandle = await getStoredHandle();
            
            // If API not supported, alert and exit.
            if (!('showDirectoryPicker' in window)) {
                alert("Your browser doesn't support the File System Access API. Standard downloads will be used.");
                return;
            }

            if (currentHandle) {
                // Let user decide whether to clear or replace the folder check
                if (confirm(`Current save folder is "${currentHandle.name}". Do you want to CLEAR it and use normal downloads instead? \n\n(Click Cancel to choose a new folder instead)`)) {
                    await storeHandle(null);
                    await updateFolderUI();
                    return;
                }
            }
            
            try {
                // Request a new directory
                const handle = await window.showDirectoryPicker({ mode: 'readwrite' });
                await storeHandle(handle);
                await updateFolderUI();
            } catch (err) {
                if (err.name !== 'AbortError') console.error('Directory picker error:', err);
            }
        });
        
        await updateFolderUI();
    }

    const formatFilenameDate = () => {
        const d = new Date();
        const day = d.getDate();
        const monthMatch = d.toLocaleString('en-US', { month: 'long' });
        
        let hours = d.getHours();
        const minutes = d.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        
        return `${day} ${monthMatch} ${hours}-${minutes} ${ampm}`;
    };

    btnDownload.addEventListener('click', async () => {
        if (!state.currentSchemaId) return;
        
        const data = state.getSchemaState(state.currentSchemaId);
        const jsonString = JSON.stringify(data, null, 2);
        const filenameStr = `${state.currentSchemaId} ${formatFilenameDate()}.json`;
        
        const dirHandle = await getStoredHandle();
        
        if (dirHandle && 'showDirectoryPicker' in window) {
            try {
                // Ask the user to re-grant permission if they've restarted the browser
                if (await verifyPermission(dirHandle)) {
                    const fileHandle = await dirHandle.getFileHandle(filenameStr, { create: true });
                    const writable = await fileHandle.createWritable();
                    await writable.write(jsonString);
                    await writable.close();
                    flashSuccess();
                    return; // Done
                }
            } catch (err) {
                console.error("Error writing to directory handle:", err);
                alert("Could not write to the saved folder. Check permissions or select a new folder.\nFalling back to normal download.");
                await storeHandle(null);
                await updateFolderUI();
            }
        }
        
        // Fallback to traditional download if no folder selected or permission denied
        fallbackDownload(jsonString, filenameStr);
    });
    
    function fallbackDownload(content, filename) {
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
        
        flashSuccess();
    }
    
    function flashSuccess() {
        const originalText = btnDownload.innerHTML;
        btnDownload.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg> Saved!`;
        btnDownload.classList.add('success-flash');
        
        setTimeout(() => {
            btnDownload.innerHTML = originalText;
            btnDownload.classList.remove('success-flash');
        }, 2000);
    }
});
