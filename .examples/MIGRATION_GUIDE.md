# 🔄 Руководство по миграции с abc.js на abc2_final.js

## 📋 **В чем основные проблемы при миграции:**

### **1. Разные функции и интерфейсы**

| Оригинал (abc.js) | Новый (abc2_final.js) | Статус миграции |
|------------------|------------------------|-----------------|
| `InitSCR()` | `geometry.createScreenConfig()` | ✅ Прямая замена |
| `TOChisl_Create()` | `geometry.createNumber()` | ✅ Прямая замена |
| `MCompl()` | `new Complex()` | ✅ Прямая замена |
| `EExecD00()` | `geometry.createArc()` | ✅ Адаптация нужна |
| `EExecP3()` | `geometry.calculateCircleIntersections()` | ✅ Адаптация нужна |
| `CreatePN()` | Не существует | ❌ Требует адаптера |
| `CreatePTS()` | Не существует | ❌ Требует адаптера |
| `draw(arr)` | `renderer.draw()` | ✅ Прямая замена |

### **2. Разная структура объектов**

**Оригинал:**
```javascript
var obj = {OB: "D", Xc: {Re: 10, Im: 0}, R: {Re: 5, Im: 0}, ...}
```

**Новый:**
```javascript
const obj = new Arc(new Complex(10, 0), new Complex(5, 0), ...)
```

## 🚀 **Стратегия миграции:**

### **Вариант 1: Полная переработка (рекомендуется)**
```javascript
// Старый код
var d1 = CreatePN("d1");
var Chisl1 = new Object();
TOChisl_Create(Chisl1.List,MCompl(-298,0),Att0);
var PTS=CreatePTS("D00", [], [Chisl1,Chisl2,Chisl3]);

// Новый код
const geometry = new GeometryCommands();
const d1 = geometry.createArc(
    new Complex(-60, 0),    // центр из Chisl2
    new Complex(298, 0),    // радиус -Abs(Chisl1)
    new Complex(-298+298, 0), // startX
    new Complex(0, 0),      // startY
    new Complex(-298+298*Math.cos(107.7*Math.PI/180), 0),
    new Complex(298*Math.sin(107.7*Math.PI/180), 0),
    new Attributes()
);
```

### **Вариант 2: Адаптер для совместимости**
```javascript
class SimplexAdapter {
    constructor() {
        this.abc2 = {
            geometry: new GeometryCommands(),
            constructive: new ConstructiveCommands(),
            renderer: null
        };
        this.objects = {};
    }

    // Адаптация CreatePN
    CreatePN(name) {
        this.objects[name] = {
            simplexName: name,
            data: {}
        };
        return this.objects[name];
    }

    // Адаптация TOChisl_Create
    TOChisl_Create(target, value,Att) {
        const number = this.abc2.geometry.createNumber(value, new Attributes({
            level: Att.Lv,
            checked: Att.Chk,
            red: Att.Red,
            green: Att.Green,
            blue: Att.Blue
        }));

        if (target && typeof target === 'object') {
            target.OB = "C";
            target.C = value;
        }

        return number;
    }

    // Адаптация MCompl
    MCompl(re, im) {
        return new Complex(re, im);
    }

    // Адаптация Draw
    draw(arr, canvas) {
        if (!this.abc2.renderer) {
            const config = this.abc2.geometry.createScreenConfig(0, 0, canvas.width, canvas.height);
            this.abc2.renderer = new GraphicalRenderer(this.abc2.geometry, config);
            this.abc2.renderer.initialize(canvas);
        }

        // Конвертация объектов Simplex в формат abc2
        const converted = this.convertSimplexObjects(arr);
        this.abc2.renderer.draw(converted);
    }

    convertSimplexObjects(simplexArray) {
        return simplexArray
            .filter(obj => obj && obj.OB)
            .map(obj => {
                switch(obj.OB) {
                    case 'C':
                        return this.abc2.geometry.createNumber(obj.C, obj.FAtt);

                    case 'P':
                        return this.abc2.geometry.createPoint(obj.X, obj.Y, obj.W, obj.FAtt);

                    case 'D':
                        return this.abc2.geometry.createArc(
                            obj.Xc, obj.Yc, obj.R,
                            obj.X1, obj.Y1, obj.X2, obj.Y2,
                            obj.FAtt
                        );

                    case 'O':
                        return this.abc2.geometry.createLine(
                            obj.X1, obj.Y1, obj.W1,
                            obj.X2, obj.Y2, obj.W2,
                            obj.draw_AsBorned, obj.Vid,
                            obj.FAtt
                        );

                    default:
                        console.warn('Unknown object type:', obj.OB);
                        return null;
                }
            })
            .filter(obj => obj !== null);
    }
}

// Использование адаптера
const adapter = new SimplexAdapter();

// Теперь можно использовать старый синтаксис
var d1 = adapter.CreatePN("d1");
var Chisl1 = {};
adapter.TOChisl_Create(Chisl1, adapter.MCompl(-298,0), Att0);
adapter.draw([d1], canvas);
```

## 📋 **Быстрое руководство по миграции функций:**

### **Основные геометрические операции:**

```javascript
// Инициализация
// Старый: InitSCR(0,0,1173,452)
// Новый:
const geometry = new GeometryCommands();
const screenConfig = geometry.createScreenConfig(0,0,1173,452);

// Комплексные числа
// Старый: MCompl(-10, 5)
// Новый: new Complex(-10, 5)

// Создание числа
// Старый: TOChisl_Create(obj, value, Att)
// Новый: geometry.createNumber(value, new Attributes(...))

// Создание точки
// Старый: TOPoint_Create(obj, X, Y, W, Att)
// Новый: geometry.createPoint(X, Y, W, attributes)

// Создание линии
// Старый: TOLine_Create(obj, X1,Y1,W1, X2,Y2,W2, CK, Vid, Att)
// Nuevo: geometry.createLine(X1, Y1, W1, X2, Y2, W2, bounded, type, attributes)

// Создание дуги
// Старый: TODuga_Create(obj, Xc,Yc,R, X1,Y1, X2,Y2, Att)
// Nuevo: geometry.createArc(center, radius, startX, startY, endX, endY, attributes)

// Пересечение линий
// Старый: EExecP3(point1, point2, line1, line2, att1, att2, sg1, sg2)
// Nuevo: geometry.lineIntersection(line1, line2)

// Пересечение окружностей
// Старый: EExecP3(p1, p2, arc1, arc2, att1, att2, sg1, sg2)
// Nuevo: geometry.calculateCircleIntersections(arc1, arc2)
```

### **Конструктивные команды:**

```javascript
// Инициализация команд
const commands = new ConstructiveCommands(geometry);
const att = new Attributes({ level: 0, checked: true });

// Середина отрезка
// Старый: EExecPP(result, p1, p2, Att, sg1, sg2)
// Nuevo: commands.EExecPP(result, p1, p2, att, 1, 1)

// Проекция точки на линию
// Старый: EExecPF(point, point, line, Att, sg1, sg2)
// Nuevo: geometry.projectPointToLine(point, line)

// Дистанция
// Старый: EExecAN(result, point1, point2, Att, sg1, sg2)
// Nuevo: geometry.distancePointPoint(point1, point2)

// Угол между линиями
// Старый: EExecAO(result, line1, line2, Att, sg1, sg2)
// Nuevo: geometry.getIntersectionAngles(line1, line2)
```

## 🎯 **Практические примеры миграции:**

### **Пример 1: Создание окружности из трёх параметров**

```javascript
// Оригинал (abc.js):
var d1 = CreatePN("d1");
var Chisl1 = {C:{Re:-298, Im:0}, OB:"C"};
var Chisl2 = {C:{Re:-60, Im:0}, OB:"C"};
var Chisl3 = {C:{Re:107.7, Im:0}, OB:"C"};
EExecD00(d1, Chisl1, Chisl2, Chisl3, Att_d1);

// Новый (abc2_final.js):
const d1 = geometry.createArc(
    new Complex(-60, 0),                          // центр из Chisl2
    new Complex(298, 0),                          // радиус Abs(Chisl1)
    new Complex(-60+298, 0),                      // точка на окружности
    new Complex(0, 0),
    new Complex(-60+298*Math.cos(107.7*Math.PI/180), 0),
    new Complex(298*Math.sin(107.7*Math.PI/180), 0),
    new Attributes({ level: 0, checked: true })
);
```

### **Пример 2: Пересечение окружностей**

```javascript
// Оригинал (abc.js):
var p1 = CreatePN("p1");
var p2 = CreatePN("p2");
EExecP3(p1, p2, d4, d6, Att_p1, Att_p2, 1, 1);

// Новый (abc2_final.js):
const intersections = geometry.calculateCircleIntersections(d4, d6);
if (intersections) {
    const p1 = geometry.createPoint(intersections.X1, intersections.Y1, 1, Att_p1);
    const p2 = geometry.createPoint(intersections.X2, intersections.Y2, 1, Att_p2);
}
```

### **Пример 3: Отрисовка**

```javascript
// Оригинал (abc.js):
var arr = [d1, d2, d3, p1, p2];
draw(arr);

// Nuevo (abc2_final.js):
const objects = [d1, d2, d3, p1, p2];
const renderer = new GraphicalRenderer(geometry, screenConfig);
renderer.initialize(canvas);
renderer.draw(objects);
```

## 🚨 **Частые проблемы миграции:**

### **Проблема 1: Отсутствие функции CreatePN**
**Решение:** Используйте прямое создание объектов вместо именованных параметров.

### **Проблема 2: Атрибуты в разном формате**
**Решение:** Конвертируйте атрибуты:
```javascript
function convertAttributes(oldAtt) {
    return new Attributes({
        level: oldAtt.Lv,
        layers: oldAtt.lay,
        checked: oldAtt.Chk,
        red: oldAtt.Red,
        green: oldAtt.Green,
        blue: oldAtt.Blue
    });
}
```

### **Проблема 3: Различные сигнатуры функций**
**Решение:** Используйте адаптер или перепишите вызовы с новыми параметрами.

## 📚 **Дальнейшие шаги:**

1. **Создайте полный адаптер** для всех специфических функций Simplex
2. **Напишите автоматический конвертор** для файлов .svg → abc2_final.js
3. **Тестируйте постепенно** - начните с простых примеров
4. **Используйте debug режим** для проверки результатов

**Удачной миграции!** 🎉