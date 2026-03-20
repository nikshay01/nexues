const fs = require('fs');
const path = require('path');

const schemaCode = fs.readFileSync('app/js/schemas.js', 'utf8');
let SCHEMAS;
eval(schemaCode.replace('const SCHEMAS =', 'SCHEMAS ='));

function extractJsFields(fieldsObj) {
    let keys = [];
    for (let key in fieldsObj) {
        keys.push(key);
        if (fieldsObj[key].type === 'group' && fieldsObj[key].fields) {
            keys = keys.concat(extractJsFields(fieldsObj[key].fields));
        }
        if (fieldsObj[key].type === 'array' && fieldsObj[key].itemFields) {
            keys = keys.concat(extractJsFields(fieldsObj[key].itemFields));
        }
    }
    return keys;
}

const txtDir = 'data/schema';
const files = fs.readdirSync(txtDir).filter(f => f.endsWith('.txt'));

let report = "--- SCHEMA COMPARISON REPORT ---\n\n";

const ignoreTxtFields = new Set(['_id', 'user_id', 'created_at', 'updated_at', 'date', 'recorded_at']);

files.forEach(file => {
    const rawName = file.replace('.txt', '');
    let schemaKey = rawName.replace(/ /g, '_');
    
    // Handle plural to singular mapping if needed
    if (!SCHEMAS[schemaKey] && SCHEMAS[schemaKey.replace(/entries/,'entry')]) {
        schemaKey = schemaKey.replace(/entries/,'entry');
    }
    
    if (!SCHEMAS[schemaKey]) {
        report += `[${rawName}] NOT FOUND IN JS SCHEMAS\n\n`;
        return;
    }
    
    const jsFields = extractJsFields(SCHEMAS[schemaKey].fields);
    
    const content = fs.readFileSync(path.join(txtDir, file), 'utf8');
    const lines = content.split('\n');
    let txtFields = [];
    
    lines.forEach(line => {
        const clean = line.split('#')[0].trim();
        if (!clean) return;
        
        // Skip obvious headers (all caps, no underscores or single word all caps)
        if (/^[A-Z0-9 -]+$/.test(clean) && !clean.includes('_') && clean.toUpperCase() === clean) return;
        
        // Extract field name before [] or {} or space
        let match = clean.match(/^([a-z0-9_]+)/i);
        if (match && match[1]) {
            const fieldName = match[1].toLowerCase();
            // skip the root schema name if it matches the file name loosely
            if (fieldName === rawName.split(' ')[0]) return;
            if (ignoreTxtFields.has(fieldName)) return;
            txtFields.push(fieldName);
        }
    });
    
    const jsSet = new Set(jsFields.map(f => f.toLowerCase()));
    const txtSet = new Set(txtFields);
    
    // JS ignores
    jsSet.delete('date');
    jsSet.delete('recorded_at');
    jsSet.delete('timestamp');
    jsSet.delete('timestamp_start');
    jsSet.delete('timestamp_end');
    
    const missingInJs = txtFields.filter(f => !jsSet.has(f));
    const extraInJs = jsFields.filter(f => !txtSet.has(f) && !ignoreTxtFields.has(f));
    
    if (missingInJs.length || extraInJs.length) {
        report += `=== SCEMA: ${rawName} ===\n`;
        if (missingInJs.length) report += `MISSING in App (In TXT, but missing in JS):\n  - ${missingInJs.join('\n  - ')}\n\n`;
        if (extraInJs.length) report += `EXTRA in App (In JS, but not in TXT):\n  - ${extraInJs.join('\n  - ')}\n\n`;
    } else {
        report += `=== SCEMA: ${rawName} ===\nPERFECT MATCH\n\n`;
    }
});

fs.writeFileSync('comparison_report.txt', report);
console.log("Done");
