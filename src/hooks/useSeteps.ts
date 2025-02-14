import { useMemo, useState } from 'react';

export const useSteps = (stepsList: string[], defaultStep?: string): [string, ...(() => void)[]] => {
    const [currentStep, setCurrentStep] = useState(defaultStep || stepsList[0]);

    const changeStepHandlers = useMemo(
        () => stepsList.map((step) => () => setCurrentStep(step)),
        [stepsList]
    );

    return [currentStep, ...changeStepHandlers];
};
