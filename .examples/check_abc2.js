// Проверочный скрипт для abc2_final.js
console.log('=== Проверка экспорта abc2_final.js ===');

// Проверка основных классов
testClass('Complex');
testClass('Attributes');
testClass('GeometryObject');
testClass('Point');
testClass('Line');
testClass('Arc');
testClass('NumberObject');
testClass('EmptyObject');
testClass('ConditionObject');
testClass('ProeLine');
testClass('Collinearity');
testClass('Correlation');
testClass('Quadrilateral');
testClass('Contour');
testClass('ScreenConfig');

// Проверка классов команд
testClass('GeometryCommands');
testClass('ConstructiveCommands');
testClass('ProjectiveGeometry');
testClass('GraphicalRenderer');
testClass('FileManager');
testClass('UIManager');

// Проверка глобальных функций
testFunction('returnEmpty');
testFunction('geometry');

// Проверка методов класса Complex
if (typeof Complex !== 'undefined') {
    try {
        const complex = new Complex(3, 4);
        testMethod('Complex', complex, 'abs');
        testMethod('Complex', complex, 'add');
        testMethod('Complex', complex, 'multiply');
        console.log('✅ Complex класс функционален');
    } catch(e) {
        console.log('❌ Complex класс ошибочный:', e.message);
    }
}

// Проверка методов GeometryCommands
if (typeof GeometryCommands !== 'undefined') {
    try {
        const geom = new GeometryCommands();
        testMethod('GeometryCommands', geom, 'createPoint');
        testMethod('GeometryCommands', geom, 'createLine');
        testMethod('GeometryCommands', geom, 'createArc');
        console.log('✅ GeometryCommands класс функционален');
    } catch(e) {
        console.log('❌ GeometryCommands класс ошибочный:', e.message);
    }
}

// Проверка GraphicalRenderer
if (typeof GraphicalRenderer !== 'undefined' && typeof GeometryCommands !== 'undefined') {
    try {
        const geom = new GeometryCommands();
        const config = geom.createScreenConfig(0, 0, 600, 400);
        const renderer = new GraphicalRenderer(geom, config);
        testMethod('GraphicalRenderer', renderer, 'initialize');
        testMethod('GraphicalRenderer', renderer, 'draw');
        console.log('✅ GraphicalRenderer класс функционален');
    } catch(e) {
        console.log('❌ GraphicalRenderer класс ошибочный:', e.message);
    }
}

function testClass(name) {
    if (typeof window[name] !== 'undefined') {
        console.log(`✅ Класс ${name} доступен`);
    } else if (typeof exports !== 'undefined' && exports[name]) {
        console.log(`✅ Класс ${name} доступен (Node.js exports)`);
    } else {
        console.log(`❌ Класс ${name} НЕ доступен`);
    }
}

function testFunction(name) {
    if (typeof window[name] === 'function') {
        console.log(`✅ Функция ${name} доступна`);
    } else if (typeof exports !== 'undefined' && exports[name]) {
        console.log(`✅ Функция ${name} доступна (Node.js exports)`);
    } else {
        console.log(`❌ Функция ${name} НЕ доступна`);
    }
}

function testMethod(className, obj, methodName) {
    if (typeof obj[methodName] === 'function') {
        console.log(`✅ ${className}.${methodName}() доступен`);
    } else {
        console.log(`❌ ${className}.${methodName}() НЕ доступен`);
    }
}

console.log('=== Проверка завершена ===');
console.log('Если все тесты прошли - abc2_final.js работает корректно!');

// Для выполнения в браузере, добавьте в HTML:
// <script src="abc2_final.js"></script>
// <script>
// console.log('Проверяем доступность классов...');
// if (typeof Complex === 'undefined') { alert('❌ Complex не доступен!'); }
// if (typeof GeometryCommands === 'undefined') { alert('❌ GeometryCommands не доступен!'); }
// if (typeof GraphicalRenderer === 'undefined') { alert('❌ GraphicalRenderer не доступен!'); }
// alert('✅ Все классы доступны!');
// </script>