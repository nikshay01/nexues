// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('schema-nav');
    const bottomActions = document.getElementById('bottom-actions');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const datetimeDisplay = document.getElementById('current-datetime');
    
    // Initialize Form Builder
    const formBuilder = new FormBuilder(state);

    // Render Navigation
    Object.keys(SCHEMAS).forEach(schemaId => {
        const schema = SCHEMAS[schemaId];
        const btn = document.createElement('button');
        btn.className = 'nav-item';
        btn.textContent = schema.label;
        btn.dataset.schema = schemaId;
        
        btn.addEventListener('click', () => {
            // Update Active State
            document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
            btn.classList.add('active');
            
            // Set State and Build Form
            state.setCurrentSchema(schemaId);
            formBuilder.buildForm(schemaId);
            
            // Show bottom actions
            bottomActions.style.display = 'flex';
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
        
        nav.appendChild(btn);
    });

    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Live Date/Time Display
    const updateDateTime = () => {
        const now = new Date();
        const options = { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        };
        datetimeDisplay.textContent = now.toLocaleDateString(undefined, options);
    };
    
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Theme selector
    const bgSelector = document.getElementById('bg-selector');
    
    // Setup initial background
    document.body.classList.add('bg-blueprint');

    bgSelector.addEventListener('change', (e) => {
        // Remove all bg- classes
        document.body.classList.forEach(cls => {
            if (cls.startsWith('bg-')) {
                document.body.classList.remove(cls);
            }
        });
        
        // Add new background class
        document.body.classList.add(`bg-${e.target.value}`);
    });
});
