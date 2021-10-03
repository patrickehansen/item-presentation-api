export function mapToDynamo(input: object): object {
  return Object.entries(input).reduce((a: any, [key, value]) => {
    let finalValue;
    switch (typeof value) {
      case 'string': {
        break;
      }
      case 'number': {
        break;
      }
      case 'boolean': {
        break;
      }
      case 'object': {
        break;
      }
      default: {
        
      }
    }

    if (!finalValue) return a;

    a[key] = finalValue;
    
    return a;
  }, {})
}