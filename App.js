import React,{ useState,useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {firebase} from './config';
import { FontAwesome } from '@expo/vector-icons';


const Home = () =>{
  const [ todos,setTodos ] = useState([]);
  const todoRef = firebase.firestore().collection('todos');
  const [addData,setAddData] = useState('');


  //fetch or read the data from firestore

  useEffect(() => {
    todoRef
    .orderBy('createdAt','desc')
    .onSnapshot(
      querySnapshot => {
        const todos = []
        querySnapshot.forEach((doc) => {
          const {heading} = doc.data()
          todos.push({
            id: doc.id,
            heading,
          })
        })
        setTodos(todos)
      }
    )
  },[])

  //delete data from firestore db

  const deleteTodo = (todos) => {
    todoRef
        .doc(todos.id)
        .delete()
        .then(() => {
          //alert
          alert("Deleted Ssuccessfully")
        })
        .catch(error => {
          alert(error);
        })
  }
  //add a data

  const addTodo = () => {

    // check if we have a data

    if (addData && addData.length > 0){

      //get the timestamp

      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: addData,
        createdAt: timestamp
      }
      todoRef
       .add(data)
       .then(() => {
        alert('Add successfully')
        setAddData('');

        Keyboard.dismiss();
       })
       .catch((error) => {
        alert(error);
       })
    }
  }

  return(
    <View style={{flex:1}}>
      <View style={Styles.formContainer}>
        <TextInput
        style={Styles.input}
        placeholder="Type"
        placeholderTextColor='#aaaaaa'
        onChangeText={(heading) => setAddData(heading)}
        value={addData}
        underlineColorAndroid='transparent'
        autoCapitalize='none'
        />
        <TouchableOpacity style={Styles.button} onPress={addTodo}>
          <Text style={Styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
      data={todos}
      numColumns={1}
      renderItem={({item}) => (
        <View style={Styles.container}>

            <FontAwesome
            name='trash-o'
            color='red'
            onPress={() => deleteTodo(item)}
            style={Styles.todoIcon}
            />
            <View style={Styles.innerContainer}>
              <Text style={Styles.itemHeading}>
                {item.heading[0].toUpperCase() + item.heading.slice(1)}
              </Text>
            </View>
        </View>
      )}
      />
    </View>
  )
}


const Styles = StyleSheet.create({
  container:{
    backgroundColor:"#e5e5e5",
    padding:15,
    borderRadius:15,
    margin:5,
    marginHorizontal:10,
    flexDirection:"row",
    alignItems:"center"
  },
  innerContainer:{
    alignItems:'center',
    flexDirection:'column',
    marginLeft:45,
  },
  itemHeading:{
    fontWeight:"bold",
    fontSize:18,
    marginRight:22
  },
  formContainer:{
    flexDirection:'row',
    height:80,
    marginLeft:10,
    marginRight:10,
    marginTop:100
  },
  input:{
     height:48,
     borderRadius:5,
     overflow:'hidden',
     backgroundColor:'white',
     paddingLeft:16,
    flex:1,
    marginRight:5,
    borderWidth:1
  },
  button:{
    height:47,
    borderRadius:5,
    backgroundColor:"#788eec",
    width:80,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText:{
    color:"white",
    fontSize:20,
  },
  todoIcon:{
    marginTop:5,
    fontSize:20,
    marginLeft:14
  }

})

export default Home;