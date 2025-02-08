// performs deep copying
export function cloneDeep<T>(obj: T): T {
  // Checking whether the object is null or not an object.
  if (obj === null || typeof obj !== 'object') {
    return obj; // Return the value if it is not an object
  }

  // Determining whether an object is an array
  if (Array.isArray(obj)) {
    return obj.map((item) => cloneDeep(item)) as unknown as T; // Recursively copying each element of the array
  }

  // Creating a new object
  const newObj: {[key: string]: any} = {};

  // Copying each property of the object
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = cloneDeep(obj[key]); // Recursively copying the property value
    }
  }

  return newObj as T; // Returning a new object
}
