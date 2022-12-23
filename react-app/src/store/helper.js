export const normalize = (array) => {
    const noramlizedObject = {}
    array.forEach(item => noramlizedObject[item.id] = item)
    return noramlizedObject
  }
