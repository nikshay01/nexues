// js/formBuilder.js

class FormBuilder {
    constructor(stateManager) {
        this.state = stateManager;
        this.container = document.getElementById('form-container');
        this.setupComputedFieldListeners();
    }

    setupComputedFieldListeners() {
        this.state.subscribe(() => {
            if (!this.state.currentSchemaId) return;
            const schema = SCHEMAS[this.state.currentSchemaId];
            this.updateComputedFields(schema.fields, "");
        });
    }

    formatLabel(key) {
        return key.replace(/_/g, ' ')
                  .replace(/\b\w/g, l => l.toUpperCase());
    }

    buildForm(schemaId) {
        this.container.innerHTML = '';
        const schema = SCHEMAS[schemaId];
        if (!schema) return;

        const title = document.createElement('h2');
        title.className = 'form-title';
        title.textContent = schema.label;
        this.container.appendChild(title);

        const form = document.createElement('form');
        form.id = `form-${schemaId}`;
        form.className = 'schema-form';
        form.onsubmit = (e) => e.preventDefault();
        
        // Single level grid by default
        const grid = document.createElement('div');
        grid.className = 'form-grid';
        
        for (const [key, fieldDef] of Object.entries(schema.fields)) {
            grid.appendChild(this.buildField(key, fieldDef, key));
        }
        
        form.appendChild(grid);
        this.container.appendChild(form);
        
        // Initial computation
        this.updateComputedFields(schema.fields, "");
    }

    buildField(key, fieldDef, path) {
        const type = fieldDef.type;
        const value = this.state.getValue(this.state.currentSchemaId, path);

        if (type === 'group') {
            return this.buildGroup(key, fieldDef, path);
        } else if (type === 'array') {
            return this.buildArray(key, fieldDef, path);
        }

        const group = document.createElement('div');
        group.className = 'form-group';
        
        // Make textareas full width natively
        if (type === 'textarea' || type === 'tags' || type === 'computed') {
            group.classList.add('full-width');
        }

        let labelText = fieldDef.label || this.formatLabel(key);
        const label = document.createElement('label');
        label.innerHTML = `${labelText} ${fieldDef.required ? '<span class="required-asterisk">*</span>' : ''}`;
        group.appendChild(label);

        let input;

        switch (type) {
            case 'scale': {
                const rangeContainer = document.createElement('div');
                rangeContainer.className = 'range-container';
                
                input = document.createElement('input');
                input.type = 'range';
                input.className = 'range-input';
                input.min = fieldDef.min || 1;
                input.max = fieldDef.max || 10;
                input.value = value !== undefined ? value : Math.floor((input.max - input.min) / 2) + parseInt(input.min);
                input.required = !!fieldDef.required;

                const badge = document.createElement('span');
                badge.className = 'range-badge';
                badge.textContent = input.value;

                input.addEventListener('input', (e) => {
                    badge.textContent = e.target.value;
                    let val = parseFloat(e.target.value);
                    
                    // Color shift logic (simple linear calculation between red(0)/green(120) hues)
                    // If it's a stress/bad metric, usually lower is better, but it's context dependent. We'll default to amber.
                    
                    this.state.setValue(path, val);
                });
                
                if (value === undefined) {
                    this.state.setValue(path, parseFloat(input.value));
                }

                rangeContainer.appendChild(input);
                rangeContainer.appendChild(badge);
                group.appendChild(rangeContainer);
                break;
            }
            case 'number':
                input = document.createElement('input');
                input.type = 'number';
                input.step = 'any';
                input.value = value !== undefined ? value : '';
                input.addEventListener('input', (e) => this.state.setValue(path, e.target.value ? parseFloat(e.target.value) : null));
                group.appendChild(input);
                break;
            case 'text':
                input = document.createElement('input');
                input.type = 'text';
                input.value = value || '';
                input.addEventListener('input', (e) => this.state.setValue(path, e.target.value));
                group.appendChild(input);
                break;
            case 'textarea':
                input = document.createElement('textarea');
                input.value = value || '';
                input.addEventListener('input', (e) => this.state.setValue(path, e.target.value));
                group.appendChild(input);
                break;
            case 'boolean': {
                const toggleContainer = document.createElement('label');
                toggleContainer.className = 'toggle-switch';
                
                input = document.createElement('input');
                input.type = 'checkbox';
                input.checked = !!value;
                input.addEventListener('change', (e) => this.state.setValue(path, e.target.checked));
                
                const slider = document.createElement('span');
                slider.className = 'toggle-slider';
                
                toggleContainer.appendChild(input);
                toggleContainer.appendChild(slider);
                group.appendChild(toggleContainer);
                break;
            }
            case 'select':
                input = document.createElement('select');
                const defaultOp = document.createElement('option');
                defaultOp.value = '';
                defaultOp.textContent = 'Select...';
                input.appendChild(defaultOp);
                
                if (fieldDef.options) {
                    fieldDef.options.forEach(opt => {
                        const option = document.createElement('option');
                        option.value = opt;
                        option.textContent = opt;
                        if (value === opt) option.selected = true;
                        input.appendChild(option);
                    });
                }
                input.addEventListener('change', (e) => this.state.setValue(path, e.target.value));
                group.appendChild(input);
                break;
            case 'time':
            case 'date':
            case 'datetime': {
                input = document.createElement('input');
                if (type === 'time') input.type = 'time';
                else if (type === 'date') input.type = 'date';
                else input.type = 'datetime-local';
                
                if (value) {
                    input.value = value;
                } else if (fieldDef.required || type === 'datetime' || type === 'date') {
                    // Default to current date/time
                    const now = new Date();
                    let defVal = '';
                    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
                    
                    if (type === 'date') {
                        defVal = now.toISOString().slice(0, 10);
                    } else if (type === 'datetime') {
                        defVal = now.toISOString().slice(0, 16);
                    } else {
                        defVal = now.toISOString().slice(11, 16);
                    }
                    input.value = defVal;
                    // Dont persist immediately to avoid empty submits with just dates, wait for user interact or download
                    this.state.setValue(path, defVal);
                }
                
                input.addEventListener('input', (e) => this.state.setValue(path, e.target.value));
                group.appendChild(input);
                break;
            }
            case 'tags': {
                const container = document.createElement('div');
                container.className = 'tags-input-container';
                
                let tags = Array.isArray(value) ? [...value] : [];
                if (!Array.isArray(value)) this.state.setValue(path, tags);
                
                const renderTags = () => {
                   container.innerHTML = '';
                   tags.forEach((tagText, idx) => {
                       const tag = document.createElement('div');
                       tag.className = 'tag';
                       tag.textContent = tagText;
                       
                       const removeBtn = document.createElement('button');
                       removeBtn.className = 'tag-remove';
                       removeBtn.innerHTML = '×';
                       removeBtn.onclick = (e) => {
                           e.preventDefault();
                           tags.splice(idx, 1);
                           this.state.setValue(path, tags);
                           renderTags();
                       };
                       
                       tag.appendChild(removeBtn);
                       container.appendChild(tag);
                   });
                   
                   const tagInput = document.createElement('input');
                   tagInput.type = 'text';
                   tagInput.className = 'tag-input';
                   tagInput.placeholder = fieldDef.placeholder || 'Type and press Enter...';
                   
                   tagInput.addEventListener('keydown', (e) => {
                       if (e.key === 'Enter' || e.key === ',') {
                           e.preventDefault();
                           const val = tagInput.value.trim().replace(/^,|,$/g, '');
                           if (val && !tags.includes(val)) {
                               tags.push(val);
                               this.state.setValue(path, tags);
                               renderTags();
                               container.querySelector('.tag-input').focus();
                           }
                       }
                   });
                   
                   container.appendChild(tagInput);
                };
                
                renderTags();
                group.appendChild(container);
                break;
            }
            case 'computed':
                input = document.createElement('div');
                input.className = 'computed-value';
                input.id = `computed-${path.replace(/\./g, '-')}`;
                input.textContent = value || '—';
                // Computed fields are calculated elsewhere
                group.appendChild(input);
                break;
        }

        if (input && fieldDef.required && input.tagName === 'INPUT') {
             input.required = true;
        }

        return group;
    }

    buildGroup(key, fieldDef, path) {
        const section = document.createElement('div');
        section.className = 'form-section full-width';
        
        const title = document.createElement('h3');
        title.className = 'section-title';
        title.textContent = fieldDef.label || this.formatLabel(key);
        section.appendChild(title);
        
        const grid = document.createElement('div');
        grid.className = 'form-grid';
        
        for (const [subKey, subField] of Object.entries(fieldDef.fields)) {
            grid.appendChild(this.buildField(subKey, subField, `${path}.${subKey}`));
        }
        
        section.appendChild(grid);
        return section;
    }

    buildArray(key, fieldDef, path) {
        const group = document.createElement('div');
        group.className = 'form-group full-width array-container';
        
        const label = document.createElement('label');
        label.innerHTML = `${fieldDef.label || this.formatLabel(key)} ${fieldDef.required ? '<span class="required-asterisk">*</span>' : ''}`;
        group.appendChild(label);
        
        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'array-items-wrapper';
        group.appendChild(itemsContainer);
        
        let items = this.state.getValue(this.state.currentSchemaId, path);
        if (!Array.isArray(items)) {
            items = [];
            this.state.setValue(path, items);
        }
        
        const renderItems = () => {
            items = this.state.getValue(this.state.currentSchemaId, path) || [];
            itemsContainer.innerHTML = '';
            
            items.forEach((item, index) => {
                const itemCard = document.createElement('div');
                itemCard.className = 'array-item';
                
                const itemHeader = document.createElement('div');
                itemHeader.className = 'array-item-header';
                
                const itemTitle = document.createElement('div');
                itemTitle.className = 'array-item-title';
                itemTitle.textContent = `Entry #${index + 1}`;
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'btn btn-danger';
                removeBtn.innerHTML = '✕ Remove';
                removeBtn.onclick = (e) => {
                    e.preventDefault();
                    this.state.removeArrayItem(path, index);
                    renderItems();
                };
                
                itemHeader.appendChild(itemTitle);
                itemHeader.appendChild(removeBtn);
                itemCard.appendChild(itemHeader);
                
                const grid = document.createElement('div');
                grid.className = 'form-grid';
                
                for (const [subKey, subField] of Object.entries(fieldDef.itemFields)) {
                    grid.appendChild(this.buildField(subKey, subField, `${path}.${index}.${subKey}`));
                }
                
                itemCard.appendChild(grid);
                itemsContainer.appendChild(itemCard);
            });
        };
        
        renderItems();
        
        const addBtn = document.createElement('button');
        addBtn.className = 'btn-add-array';
        addBtn.innerHTML = '+ Add Entry';
        addBtn.onclick = (e) => {
            e.preventDefault();
            const currentItems = this.state.getValue(this.state.currentSchemaId, path) || [];
            currentItems.push({});
            this.state.setValue(path, currentItems);
            renderItems();
        };
        
        group.appendChild(addBtn);
        return group;
    }
    
    updateComputedFields(fields, basePath) {
        if (!this.state.currentSchemaId) return;
        
        const currState = this.state.getSchemaState(this.state.currentSchemaId);
        
        for (const [key, fieldDef] of Object.entries(fields)) {
            const path = basePath ? `${basePath}.${key}` : key;
            
            if (fieldDef.type === 'group') {
                this.updateComputedFields(fieldDef.fields, path);
            } else if (fieldDef.type === 'computed') {
                try {
                    // Extremely simple expression evaluator just for the specific formulas requested
                    // e.g. "pre_stress_level - post_stress_level"
                    let result = 0;
                    
                    if (fieldDef.formula.includes('-')) {
                         const parts = fieldDef.formula.split('-').map(p => p.trim());
                         if (parts.length === 2) {
                             const a = this.state.getValue(this.state.currentSchemaId, `${basePath ? basePath + '.' : ''}${parts[0]}`);
                             const b = this.state.getValue(this.state.currentSchemaId, `${basePath ? basePath + '.' : ''}${parts[1]}`);
                             if (a !== undefined && b !== undefined) {
                                 result = Number(a) - Number(b);
                                 this.state.setValue(path, result);
                                 const el = document.getElementById(`computed-${path.replace(/\./g, '-')}`);
                                 if (el) el.textContent = result;
                             }
                         }
                    }
                } catch(e) {
                    console.error("Error computing field:", path, e);
                }
            }
        }
    }
}
