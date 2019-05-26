//---------------------------------------------------------------------
// Imports Section:
//---------------------------------------------------------------------
import 'reflect-metadata';

//---------------------------------------------------------------------
// Interface Section:
//---------------------------------------------------------------------
export interface ValidationDescriptor
{
    field?    : string;
    type?     : string;
    required  : boolean;
    max?      : number;
    min?      : number;
    regex?    : Formats;
}

//---------------------------------------------------------------------
// RegEx Library Section:
//---------------------------------------------------------------------
export enum Formats {
    alpha       = '^^[a-zA-Z]+[\-\'\s]?[a-zA-Z ]{1,40}$',
    email       = '^[A-Z0-9_!#$%&\' * +/=?`{|}~^-]+(?:\.[A-Z0-9_!#$%&\'*+/=?`{|}~^-]+)*@[A - Z0 - 9 -]+(?: \.[A - Z0 - 9 -] +)* $',
    phone       = '^ [+] * [(]{ 0, 1}[0 - 9]{ 1, 4 } [)]{ 0, 1 } [-\s\./ 0 - 9] * $',
    credit_card = '^4[0-9]{12}(?:[0-9]{3})?$'
}

//---------------------------------------------------------------------
// Decorator Methods Section:
//---------------------------------------------------------------------
export const validations = (validator: ValidationDescriptor) => {
    return (target: any, propertyKey: string) =>
    {
        Object.defineProperty(
            validator, 'field',
            withValue(propertyKey)
        );

        const propType: string =
            getTypeString(
                Reflect.getMetadata(
                    'design:type',
                    target,
                    propertyKey
                ).toString()
            ).toLowerCase();

        Object.defineProperty(
            validator, 'type',
            withValue(propType)
        );

        if (!target['__validators'])
        {
            Object.defineProperty(
                target, '__validators',
                withValue([{
                    ...validator,
                }])
            );
        }
        else
        {
            Object.defineProperty(
                target, '__validators',
                withValue(target['__validators'].concat([{
                    ...validator,
                }]))
            );
        }
    };
};

//---------------------------------------------------------------------
// Utility Methods Section:
//---------------------------------------------------------------------
function withValue(value: any)
{
    const d: any = withValue['d'] || (
        withValue['d'] = {
            enumerable      : true,
            writable        : true,
            configurable    : true,
            value           : null
        }
    );

    d.value = value;

    return d;
}
//---------------------------------------------------------------------
function getTypeofProperty<T, K extends keyof T>(o: T, name: K)
{
    return typeof o[name];
}
//---------------------------------------------------------------------
function getTypeString(chunk: string): string
{
    return chunk.substring((chunk.indexOf('function') + 9), chunk.indexOf('('));
}
