/**
 * @name nameof
 * nameof solves a programmatic property name access problem at compile time,
 * and intellisense is smart enough to pick up the suggestions from it. Lets me
 * avoid magic numbers where I need to name a type's property.
 * 
 * @author https://github.com/dsherret
 * @link https://github.com/dsherret/ts-nameof/issues/121#issue-1083879224
 * 
 * @param obj object instance on which keyof will operate
 * @param key a named key which should be identified by the typesystem
 * @returns string: the typechecked name of a key from a type, class, interface, object
 */
export function nameof<TObject>(obj: TObject, key: keyof TObject): string;
export function nameof<TObject>(key: keyof TObject): string;
export function nameof(key1: any, key2?: any): any {
  return key2 ?? key1;
};