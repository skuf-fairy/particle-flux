// выполняет глубокое копирование
export function cloneDeep<T>(obj: T): T {
  // Проверяем, является ли объект null или не является объектом
  if (obj === null || typeof obj !== 'object') {
    return obj; // Возвращаем значение, если это не объект
  }

  // Определяем, является ли объект массивом
  if (Array.isArray(obj)) {
    return obj.map((item) => cloneDeep(item)) as unknown as T; // Рекурсивно копируем каждый элемент массива
  }

  // Создаем новый объект
  const newObj: {[key: string]: any} = {};

  // Копируем каждое свойство объекта
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = cloneDeep(obj[key]); // Рекурсивно копируем значение свойства
    }
  }

  return newObj as T; // Возвращаем новый объект
}
