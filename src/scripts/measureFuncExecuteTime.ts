export function measureFuncExecuteTime(fn: VoidFunction, runs = 100, trimPercentage = 10) {
  // прогрев перед основным тестом
  for (let i = 0; i < 1000; i++) {
    fn();
  }

  const times = [];

  // Запускаем функцию `runs` раз и собираем время выполнения
  for (let i = 0; i < runs; i++) {
    const start = performance.now(); // Точное время начала
    fn(); // Вызов тестируемой функции
    const end = performance.now(); // Точное время окончания
    times.push(end - start); // Записываем время в массив
  }

  // Сортируем результаты для дальнейшего анализа
  times.sort((a, b) => a - b);

  // Отсекаем крайние значения (например, 10% самых медленных и быстрых)
  const trimCount = Math.floor((runs * trimPercentage) / 100);
  const trimmedTimes = times.slice(trimCount, runs - trimCount);

  // Вычисляем среднее, медиану, минимум и максимум
  const average = trimmedTimes.reduce((sum, t) => sum + t, 0) / trimmedTimes.length;
  const median = trimmedTimes[Math.floor(trimmedTimes.length / 2)];
  const min = Math.min(...trimmedTimes);
  const max = Math.max(...trimmedTimes);

  return {
    runs,
    trimmedRuns: trimmedTimes.length,
    average,
    median,
    min,
    max,
    // allTimes: times, // Все замеры (для дополнительного анализа)
  };
}
