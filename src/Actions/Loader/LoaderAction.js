import Action from '../index';

export function SetLoader(isLoading, HasBackground = true, ShowText = true) {
    return {
        type: Action.Set_Loader,
        IsLoading: isLoading,
        HasBackground: HasBackground,
        ShowText: ShowText
    };
}