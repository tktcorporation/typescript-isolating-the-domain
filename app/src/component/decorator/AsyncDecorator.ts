export type VoidFunc = (() => Promise<void>) | (() => void);
export type ErrorArgVoidFunc = ((error: any) => Promise<void>) | (() => void);
/**
 *
 * @param beforeFunc no args void func
 * @param afterFunc no args void func
 * @param catchFunc error arg void func
 */
export function AsyncDecorator(
    beforeFunc?: VoidFunc,
    afterFunc?: VoidFunc,
    catchFunc?: ErrorArgVoidFunc,
    finalFunc?: VoidFunc,
): MethodDecorator {
    return function (
        target: Object,
        methodName: string | symbol,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const originalMethodFunc = async () => {
                return originalMethod.apply(this, [...args]);
            };
            const asyncFunc = async () => {
                try {
                    await beforeFunc?.();
                    const result = await originalMethodFunc();
                    await afterFunc?.();
                    return result;
                } catch (e) {
                    if (catchFunc === undefined) throw e;
                    await catchFunc?.(e);
                } finally {
                    await finalFunc?.();
                }
            };
            return asyncFunc();
        };
    };
}
