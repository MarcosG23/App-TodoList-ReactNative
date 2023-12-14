import { StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',

    },

    text:{
      fontSize: 50,
      position: 'absolute',
      top: 30

    },
    /*caixaLogin:{
      height:"50%",
      width: "80%",
      borderWidth:1,
      borderRadius: 10,
      borderColor: "#848484",
      position:"relative",
      display: 'flex',
    
    },*/

    caixaDeEmail:{
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      position: 'relative',
      height:"15%",
      width: "90%",
      borderRadius: 10,    
      bottom: 20
    },

    EmaileSenha:{
      height: 40,
      width: '100%',
      borderColor:'#848484',
      borderWidth:1,
      borderRadius:5

    },

    caixaDaSenha:{
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      position: 'relative',
      height:"15%",
      width: "90%",
      borderRadius: 10,

    },
    texto:{
      right:150
    },

    CriarEsqueci:{
      flexDirection: 'row',
      alignSelf: 'center',
      marginBottom:'5%'
    },
    link:{
      color: '#2196F3',
      marginLeft:'10%',
    },
    login:{
      borderRadius:20,
      width: 100,
      height: 100
      
    },
    imgs:{
      
    },

});

export default styles