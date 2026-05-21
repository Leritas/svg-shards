// File Operations and UI System
// Part of refactored abc2.js - File Operations and User Interface

class FileManager {
  constructor(geometry) {
    this.geometry = geometry;
    this.currentProject = {
      objects: [],
      algorithm: {
        program: [],
        nameList: []
      }
    };
  }

  saveToFile(filename = 'project.geo') {
    try {
      const data = this.serializeProject();

      if (typeof Blob !== 'undefined') {
        const blob = new Blob([data], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        return true;
      } else {
        throw new Error('File saving not supported in this environment');
      }
    } catch (error) {
      console.error('Error saving file:', error);
      return false;
    }
  }

  loadFromFile(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('No file provided'));
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const data = event.target.result;
          this.deserializeProject(data);
          resolve(true);
        } catch (error) {
          console.error('Error parsing file:', error);
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };

      reader.readAsText(file);
    });
  }

  serializeProject() {
    const data = {
      version: '2.0',
      objects: this.currentProject.objects.map(obj => this.serializeObject(obj)),
      algorithm: this.currentProject.algorithm,
      metadata: {
        created: new Date().toISOString(),
        modified: new Date().toISOString()
      }
    };

    return JSON.stringify(data, null, 2);
  }

  serializeObject(obj) {
    const serialized = {
      type: obj.type,
      attributes: {
        level: obj.attributes.level,
        layers: obj.attributes.layers,
        checked: obj.attributes.checked,
        red: obj.attributes.red,
        green: obj.attributes.green,
        blue: obj.attributes.blue
      },
      incidents: obj.incidents.map(inc => this.getObjectIndex(inc)),
      gabarit: obj.gabarit,
      selected: obj.selected
    };

    switch (obj.type) {
      case 'C':
        serialized.value = {
          re: obj.value.re,
          im: obj.value.im
        };
        break;

      case 'P':
        serialized.x = {
          re: obj.x.re,
          im: obj.x.im
        };
        serialized.y = {
          re: obj.y.re,
          im: obj.y.im
        };
        serialized.weight = obj.weight;
        serialized.direction = obj.direction;
        break;

      case 'O':
        serialized.x1 = {
          re: obj.x1.re,
          im: obj.x1.im
        };
        serialized.y1 = {
          re: obj.y1.re,
          im: obj.y1.im
        };
        serialized.x2 = {
          re: obj.x2.re,
          im: obj.x2.im
        };
        serialized.y2 = {
          re: obj.y2.re,
          im: obj.y2.im
        };
        serialized.w1 = obj.w1;
        serialized.w2 = obj.w2;
        serialized.bounded = obj.bounded;
        serialized.direction = obj.direction;
        serialized.lineType = obj.type;
        serialized.null = obj.null;
        break;

      case 'D':
        serialized.center = {
          re: obj.center.re,
          im: obj.center.im
        };
        serialized.radius = {
          re: obj.radius.re,
          im: obj.radius.im
        };
        serialized.x1 = {
          re: obj.x1.re,
          im: obj.x1.im
        };
        serialized.y1 = {
          re: obj.y1.re,
          im: obj.y1.im
        };
        serialized.x2 = {
          re: obj.x2.re,
          im: obj.x2.im
        };
        serialized.y2 = {
          re: obj.y2.re,
          im: obj.y2.im
        };
        serialized.direction = obj.direction;
        serialized.laba = obj.laba;
        serialized.level = obj.attributes.level;
        break;

      case 'W':
        serialized.lines = obj.lines.map(line => this.serializeObject(line));
        serialized.subContours = obj.subContours.map(contour => this.serializeObject(contour));
        break;

      case 'K':
      case 'k':
        serialized.S1 = this.serializeObject(obj.S1);
        serialized.S2 = this.serializeObject(obj.S2);
        serialized.S3 = this.serializeObject(obj.S3);
        serialized.S4 = this.serializeObject(obj.S4);
        serialized.D1 = this.serializeObject(obj.D1);
        serialized.D2 = this.serializeObject(obj.D2);
        serialized.D3 = this.serializeObject(obj.D3);
        serialized.D4 = this.serializeObject(obj.D4);
        break;

      case 'Y':
        serialized.PR1 = this.serializeObject(obj.PR1);
        serialized.PR2 = this.serializeObject(obj.PR2);
        serialized.PR3 = this.serializeObject(obj.PR3);
        serialized.PR4 = this.serializeObject(obj.PR4);
        serialized.PR5 = this.serializeObject(obj.PR5);
        break;
    }

    return serialized;
  }

  getObjectIndex(obj) {
    return this.currentProject.objects.indexOf(obj);
  }

  deserializeProject(data) {
    try {
      const parsed = JSON.parse(data);
      this.currentProject.objects = parsed.objects.map(obj => this.deserializeObject(obj));
      this.currentProject.algorithm = parsed.algorithm;
    } catch (error) {
      console.error('Error deserializing project:', error);
      throw new Error('Invalid project file format');
    }
  }

  deserializeObject(data) {
    let obj;

    const attributes = new Attributes({
      level: data.attributes.level,
      layers: data.attributes.layers,
      checked: data.attributes.checked,
      red: data.attributes.red,
      green: data.attributes.green,
      blue: data.attributes.blue
    });

    switch (data.type) {
      case 'C':
        obj = new NumberObject(new Complex(data.value.re, data.value.im), attributes);
        break;

      case 'P':
        obj = new Point(
          new Complex(data.x.re, data.x.im),
          new Complex(data.y.re, data.y.im),
          data.weight,
          attributes
        );
        obj.direction = data.direction;
        break;

      case 'O':
        obj = new Line(
          new Complex(data.x1.re, data.x1.im),
          new Complex(data.y1.re, data.y1.im),
          data.w1,
          new Complex(data.x2.re, data.x2.im),
          new Complex(data.y2.re, data.y2.im),
          data.w2,
          data.bounded,
          data.lineType,
          attributes
        );
        obj.direction = data.direction;
        obj.null = data.null;
        break;

      case 'D':
        obj = new Arc(
          new Complex(data.center.re, data.center.im),
          new Complex(data.radius.re, data.radius.im),
          new Complex(data.x1.re, data.x1.im),
          new Complex(data.y1.re, data.y1.im),
          new Complex(data.x2.re, data.x2.im),
          new Complex(data.y2.re, data.y2.im),
          attributes
        );
        obj.direction = data.direction;
        obj.laba = data.laba;
        break;

      case 'W':
        obj = new Contour(attributes);
        obj.lines = data.lines.map(line => this.deserializeObject(line));
        obj.subContours = data.subContours.map(contour => this.deserializeObject(contour));
        break;

      case 'K':
        obj = new Collinearity(
          this.deserializeObject(data.S1),
          this.deserializeObject(data.S2),
          this.deserializeObject(data.S3),
          this.deserializeObject(data.S4),
          this.deserializeObject(data.D1),
          this.deserializeObject(data.D2),
          this.deserializeObject(data.D3),
          this.deserializeObject(data.D4),
          attributes
        );
        break;

      case 'k':
        obj = new Correlation(
          this.deserializeObject(data.S1),
          this.deserializeObject(data.S2),
          this.deserializeObject(data.S3),
          this.deserializeObject(data.S4),
          this.deserializeObject(data.D1),
          this.deserializeObject(data.D2),
          this.deserializeObject(data.D3),
          this.deserializeObject(data.D4),
          attributes
        );
        break;

      case 'Y':
        obj = new Quadrilateral(
          this.deserializeObject(data.PR1),
          this.deserializeObject(data.PR2),
          this.deserializeObject(data.PR3),
          this.deserializeObject(data.PR4),
          this.deserializeObject(data.PR5),
          attributes
        );
        break;

      case '$':
        obj = new EmptyObject(attributes);
        break;

      default:
        console.warn('Unknown object type:', data.type);
        return null;
    }

    if (obj) {
      obj.incidents = [];
      obj.gabarit = data.gabarit;
      obj.selected = data.selected;
    }

    return obj;
  }

  clearProject() {
    this.currentProject.objects = [];
    this.currentProject.algorithm = {
      program: [],
      nameList: []
    };
  }

  addObject(obj) {
    if (obj) {
      this.currentProject.objects.push(obj);
      return obj;
    }
    return null;
  }

  removeObject(obj) {
    const index = this.currentProject.objects.indexOf(obj);
    if (index > -1) {
      this.currentProject.objects.splice(index, 1);
      return true;
    }
    return false;
  }

  getObjectByIndex(index) {
    return this.currentProject.objects[index] || null;
  }

  getObjectsByType(type) {
    return this.currentProject.objects.filter(obj => obj.type === type);
  }

  getAllObjects() {
    return [...this.currentProject.objects];
  }
}

class UIManager {
  constructor(geometry, renderer, fileManager) {
    this.geometry = geometry;
    this.renderer = renderer;
    this.fileManager = fileManager;
    this.selectedObjects = [];
    this.hoveredObject = null;
    this.interactionMode = 'select';
  }

  initializeCanvas(container) {
    const canvas = document.createElement('canvas');
    canvas.id = 'geometryCanvas';
    canvas.style.border = '1px solid #ccc';
    canvas.style.background = '#ffffff';

    container.appendChild(canvas);

    this.renderer.initialize(canvas);
    this.setupEventListeners(canvas);

    return canvas;
  }

  setupEventListeners(canvas) {
    canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    canvas.addEventListener('dblclick', (e) => this.handleDoubleClick(e));
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    canvas.addEventListener('wheel', (e) => this.handleWheel(e));
    canvas.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  handleMouseDown(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const object = this.findObjectAtPosition(x, y);

    if (e.button === 0) {
      if (this.interactionMode === 'select') {
        this.selectObject(object, e.ctrlKey);
      }
    } else if (e.button === 2) {
      this.showContextMenu(e, object);
    }
  }

  handleMouseMove(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const object = this.findObjectAtPosition(x, y);

    if (object !== this.hoveredObject) {
      this.hoveredObject = object;
      this.updateCursor();
    }
  }

  handleMouseUp(e) {
  }

  handleDoubleClick(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const object = this.findObjectAtPosition(x, y);
    if (object) {
      this.objectProperties(object);
    }
  }

  handleWheel(e) {
    e.preventDefault();
  }

  handleKeyDown(e) {
  }

  findObjectAtPosition(screenX, screenY, tolerance = 5) {
    const objects = this.fileManager.getAllObjects();

    for (let i = objects.length - 1; i >= 0; i--) {
      const obj = objects[i];
      if (this.isObjectAtPosition(obj, screenX, screenY, tolerance)) {
        return obj;
      }
    }

    return null;
  }

  isObjectAtPosition(obj, screenX, screenY, tolerance) {
    if (obj.type === 'P') {
      const point = this.renderer.worldToScreen(obj.x.re, obj.y.re);
      const distance = Math.sqrt(
        Math.pow(point.x - screenX, 2) + Math.pow(point.y - screenY, 2)
      );
      return distance < tolerance;
    } else if (obj.type === 'O') {
      const start = this.renderer.worldToScreen(obj.x1.re, obj.y1.re);
      const end = this.renderer.worldToScreen(obj.x2.re, obj.y2.re);
      return this.isPointNearLine(screenX, screenY, start.x, start.y, end.x, end.y, tolerance);
    } else if (obj.type === 'D') {
      const center = this.renderer.worldToScreen(obj.center.re, obj.center.re);
      const distance = Math.sqrt(
        Math.pow(center.x - screenX, 2) + Math.pow(center.y - screenY, 2)
      );
      return distance < tolerance + obj.radius.re * this.renderer.screenConfig.scale;
    }

    return false;
  }

  isPointNearLine(px, py, x1, y1, x2, y2, tolerance) {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;

    if (lenSq !== 0) param = dot / lenSq;

    let xx, yy;

    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }

    const distance = Math.sqrt(
      Math.pow(px - xx, 2) + Math.pow(py - yy, 2)
    );

    return distance < tolerance;
  }

  selectObject(obj, addToSelection = false) {
    if (!obj) return;

    if (addToSelection) {
      if (!this.selectedObjects.includes(obj)) {
        this.selectedObjects.push(obj);
        obj.selected = true;
      }
    } else {
      this.selectedObjects.forEach(o => o.selected = false);
      this.selectedObjects = [obj];
      obj.selected = true;
    }

    this.updateSelectionUI();
  }

  deselectAll() {
    this.selectedObjects.forEach(o => o.selected = false);
    this.selectedObjects = [];
    this.updateSelectionUI();
  }

  deleteSelected() {
    this.selectedObjects.forEach(obj => {
      this.fileManager.removeObject(obj);
    });
    this.selectedObjects = [];
    this.updateSelectionUI();
  }

  updateSelectionUI() {
    // Update UI elements to reflect selection state
    // This would typically update property panels, toolbars, etc.
    console.log('Selected objects:', this.selectedObjects.length);
  }

  updateCursor() {
    if (this.hoveredObject) {
      document.getElementById('geometryCanvas').style.cursor = 'pointer';
    } else {
      document.getElementById('geometryCanvas').style.cursor = 'default';
    }
  }

  showContextMenu(e, object) {
    // Create context menu
    const menu = document.createElement('div');
    menu.style.position = 'fixed';
    menu.style.left = `${e.clientX}px`;
    menu.style.top = `${e.clientY}px`;
    menu.style.background = '#ffffff';
    menu.style.border = '1px solid #ccc';
    menu.style.padding = '5px';
    menu.style.zIndex = '1000';

    const items = [];

    if (object) {
      items.push({ text: 'Properties', action: () => this.objectProperties(object) });
      items.push({ text: 'Delete', action: () => { this.fileManager.removeObject(object); this.deselectAll(); document.body.removeChild(menu); }});
      items.push({ text: 'Clone', action: () => this.cloneObject(object) });
    }

    items.push({ text: 'Save Project', action: () => { this.fileManager.saveToFile(); document.body.removeChild(menu); }});
    items.push({ text: 'Load Project', action: () => this.openFileDialog(); document.body.removeChild(menu); });

    items.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.textContent = item.text;
      menuItem.style.padding = '5px 10px';
      menuItem.style.cursor = 'pointer';

      menuItem.addEventListener('mouseenter', () => menuItem.style.background = '#f0f0f0');
      menuItem.addEventListener('mouseleave', () => menuItem.style.background = 'transparent');
      menuItem.addEventListener('click', item.action);

      menu.appendChild(menuItem);
    });

    document.body.appendChild(menu);

    const closeMenu = () => {
      document.removeEventListener('click', closeMenu);
      if (document.body.contains(menu)) {
        document.body.removeChild(menu);
      }
    };

    setTimeout(() => {
      document.addEventListener('click', closeMenu);
    }, 0);
  }

  objectProperties(obj) {
    console.log('Object properties:', obj);
    // Show properties dialog
  }

  cloneObject(obj) {
    const cloned = this.geometry.cloneObject(obj);
    if (cloned) {
      cloned.x = cloned.x.add(new Complex(5, 0));
      cloned.y = cloned.y.add(new Complex(5, 0));
      this.fileManager.addObject(cloned);
    }
  }

  openFileDialog() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.geo,.json';

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        this.fileManager.loadFromFile(file)
          .then(() => {
            console.log('Project loaded successfully');
            this.renderer.draw(this.fileManager.getAllObjects());
          })
          .catch(error => {
            console.error('Error loading project:', error);
            alert('Error loading project: ' + error.message);
          });
      }
    };

    input.click();
  }

  setInteractionMode(mode) {
    this.interactionMode = mode;
    console.log('Interaction mode:', mode);
  }

  refresh() {
    this.renderer.draw(this.fileManager.getAllObjects());
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FileManager,
    UIManager
  };
}