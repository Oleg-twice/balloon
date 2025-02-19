import { useSearchParams } from "./useSearchParams";
import { useSteps } from "./useSeteps";

export const useNavigateByParams = ({ pagesList = [], defaultPage = '' }: { pagesList: string[]; defaultPage?: string }) => {
    const {
        navigate,
        page
    } = useSearchParams(defaultPage);

    const [currentPage, ...openPageHandlers] = useSteps(pagesList, page, navigate);

    return [currentPage, ...openPageHandlers];
}
