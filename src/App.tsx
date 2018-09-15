import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import * as React from 'react';
import './App.css';
import {themes} from './theme-context';


interface IState {
  imageFiles: any[],
  results: any,
  dropzone: any,
  theme: any,
  toggleTheme: any
}

export default class App extends React.Component<{}, IState> {
  
  constructor(props: any) {
    super(props);
  
    this.state = {
      imageFiles: [],
      results: "",
      dropzone: this.onDrop.bind(this),
  
      theme: themes.dark,
      toggleTheme: this.toggleTheme(),
    };
  }

  public toggleTheme = () => {
    this.setState(state => ({
      theme:
        state.theme === themes.light
          ? themes.dark
          : themes.light,
    }));
  };

  public onDrop(files: any) {
    this.setState({
      imageFiles: files,
      results: ""
    })
    const file = files[0]
    const reader = new FileReader();
    reader.onload = (readerEvt) => {
        const binaryString = readerEvt.target!!.result;
        this.upload(btoa(binaryString))
    };

    reader.readAsBinaryString(file);
  }

  public upload(base64String: string) {
    fetch('https://danktrigger.azurewebsites.net/api/dank', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({
        file: base64String,
      })
    })
    .then((response : any) => {
      if (!response.ok) {
        this.setState({results: response.statusText})
      }
      else {
        response.json().then((data:any) => this.setState({results: data[0].class}))
      }
      return response
    })
  }
  
  public render() {
    return (
      <div className="container-fluid" >
            <div className="testing">
              <FormControl aria-describedby="name-helper-text" margin={"normal"} >
              <InputLabel className="textfield" >Subreddit name</InputLabel>
              <Input/>
              <FormHelperText className="helping">Helper test</FormHelperText>
              </FormControl>
          </div>
      </div>
    );
  }
}