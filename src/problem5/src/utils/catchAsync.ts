// Wrap this function out of controller, when controller is called
// This will execute the controller and add a catch
// to pass the error to the next middleware if it exists

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type, @typescript-eslint/no-explicit-any
export const catchAsync = (fn: Function) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};
