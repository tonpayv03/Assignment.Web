import Action from '../../Actions';

var initialState = {
    IsLoading: false,
    HasBackground: true,
    ShowText: true    
};

function Loader(state = initialState, action) {
    switch (action.type) {
        case Action.Set_Loader:
            return {
                ...state,
                IsLoading: action.IsLoading,
                HasBackground: action.HasBackground,
                ShowText: action.ShowText          
            };        
        default:
            return state;
    }
}

export default Loader;