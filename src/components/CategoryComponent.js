import React, {useEffect, useState} from 'react'
import { FlatList, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class CategoryComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {listData : this.props.categories, displayStyle: null}
    }
    componentDidMount(){
        console.log('did mount')
    }
    
    getClasss = (value) => {
        switch (value) {
            case 'Congitive':
                this.setState({displayStyle:'list' })
                break;
            case 'Kinesthetic': 
                his.setState({displayStyle:'list' })
                break;
            default:
                this.setState({displayStyle:null })
                break;
        }
    }

    render() {
        return (
            <View style={styles.itemContainer}>
                {this.state.listData.map(data => <Text>{data}</Text>)}
            </View>
        )
    }
}

export default CategoryComponent

const styles = StyleSheet.create({
  itemContainer:{
     flex: 1,
     flexDirection: 'row',
     marginLeft:20,
     marginRight:20,
     marginTop:10,
     marginBottom:10
  },
  list:{
      opacity: 0.84,
      color: '#000000',
      fontSize: 7,
      fontWeight: '600',
      lineHeight: 8,
      padding:5,
      margin:5,
      backgroundColor:'#68a0cf',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff',
      overflow: 'hidden'
  }
});