import { useMemo, useState } from 'react';

export const useSteps = (stepsList: string[], defaultStep?: string, callback?: (step: string) => void): [string, ...(() => void)[]] => {
    const [currentStep, setCurrentStep] = useState(defaultStep || stepsList[0]);

    const changeStepHandlers = useMemo(
        () => stepsList.map((step) => () => {
            callback?.(step);
            setCurrentStep(step);
        }),
        [callback, stepsList]
    );

    return [currentStep, ...changeStepHandlers];
};
