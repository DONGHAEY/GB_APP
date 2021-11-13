export default function member(state, action) {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
          Auth: action.stat
      }
    case 'SIGN_IN':
      return {
          Auth : true
      }
    case 'SIGN_OUT': 
      return {
          Auth : false
      }
    default:
      return {
          Auth : false
      };
  }
}

