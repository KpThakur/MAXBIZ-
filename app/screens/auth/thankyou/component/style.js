import { StyleSheet , Dimensions } from 'react-native';
import { scale } from '@utils/utils';
import {
    BLACK_COLOR, FONT_FAMILY_REGULAR, GRADIENT_COLOR,
    FONT_FAMILY_SEMIBOLD, PLACEHOLDER_COLOR, COMMON_COLOR
} from '@utils/constants';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const style = StyleSheet.create({
    
    container: {
        flex: 1,
        padding: 20,
        backgroundColor:'#ffff'
        
      },

      imageview :{ 
          flex: 5,  
        },
      showimageview :{ 
          flex: 3,
          alignItems:'center'
         },
      showtextviewfirst :
      { 
        //flex: 1,
        fontSize:25,
        fontWeight:'bold',
        marginBottom:20,
      },

      showtextviewsecond :
      { 
        //flex: 1,  
        fontSize:18,
        alignItems:'center',
        textAlign:'center'

      },
      showtextview :{ 
          flex: 3,
          alignItems:'center'
      },
      buttonview :{ 
          flex: 0.5
        },
})
export default style;