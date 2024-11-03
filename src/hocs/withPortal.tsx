import { ComponentType, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type WithPortalProps = {
    portalId?: string;
};

export function withPortal<T extends object>(
    WrappedComponent: ComponentType<T>
) {
    return (props: T & WithPortalProps) => {
        const { portalId = 'portal-root', ...restProps } = props;
        // need to be shure that dom is ready to create a portal
        const [isDomReady, setDomReady] = useState(false);

        // Ensure that the portal root exists
        useEffect(() => {
            setDomReady(true);
            let portalDiv = document.getElementById(portalId);

            if (!portalDiv) {
                portalDiv = document.createElement('div');
                portalDiv.id = portalId;
                document.body.appendChild(portalDiv);
            }

            return () => {
                setDomReady(false);
                if (portalDiv && portalDiv.parentElement) {
                    portalDiv.parentElement.removeChild(portalDiv);
                }
            };
        }, [portalId]);

        return (
            isDomReady &&
            ReactDOM.createPortal(
                <WrappedComponent {...(restProps as T)} />,
                document.getElementById(portalId)!
            )
        );
    };
}