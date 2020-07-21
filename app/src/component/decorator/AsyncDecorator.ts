export type VoidFunc = (() => Promise<void>) | (() => void);
export type ErrorArgVoidFunc = ((error: any) => Promise<void>) | (() => void);
/**
 *
 * @param beforeFunc no args void func
 * @param afterFunc no args void func
 * @param catchFunc error arg void func
 */
export function AsyncDecorator(
    beforeFunc: VoidFunc,
    afterFunc: VoidFunc,
    catchFunc: ErrorArgVoidFunc,
): MethodDecorator {
    return function (
        target: Object,
        methodName: string | symbol,
        descriptor: PropertyDescriptor,
    ) {
        // save original method - we gonna need it
        const originalMethod = descriptor.value;
        // override method descriptor with proxy method
        descriptor.value = function (...args: any[]) {
            const originalMethodFunc = async () => {
                return originalMethod.apply(this, [...args]);
            };
            const asyncFunc = async () => {
                try {
                    await beforeFunc();
                    const result = await originalMethodFunc();
                    await afterFunc();
                    return result;
                } catch (e) {
                    await catchFunc(e);
                }
            };
            return asyncFunc();
        };
    };
}
