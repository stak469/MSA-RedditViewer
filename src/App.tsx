import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import * as React from 'react';
import './App.css';


interface IState {
  results: any,
  subreddit: any,
  name: any,
  hits: any,
  container: any,
  responseJSON: any,
}

export default class App extends React.Component<{}, IState> {
  
  constructor(props: any) {
    super(props);
  
    this.state = {
      results: "",

      name: "",
      subreddit: "",
      hits: [],
      container: "",
      responseJSON: "",

    };
    this.handleChange = this.handleChange.bind(this);
    this.getInputReddit = this.getInputReddit.bind(this)
    this.fetchsubreddit = this.fetchsubreddit.bind(this)
    this.displayResults = this.displayResults.bind(this)
  }

  public handleChange = (e: any): void => {
    this.setState({
      subreddit: e.currentTarget.value
    });
  };

  
  public getInputReddit() {
    if(this.state.subreddit!==null){
            // tslint:disable-next-line:no-console 
      console.log("hi");
      this.fetchsubreddit(this.state.subreddit)
      
    }
    
  };
  
  public fetchsubreddit= async (subreddit: string) => {
    const response = await fetch('https://www.reddit.com/r/' + subreddit + '.json?sort=top')
    // tslint:disable-next-line:no-console 
    console.log("fetched");
    const responseJSON = await response.json()
    this.displayResults(responseJSON)
  };


  public render() {
    return (
      <div className="container-fluid" >
            <div className="subredditField">
              <FormControl aria-describedby="name-helper-text" margin={"normal"} >
              <InputLabel className="textfield" >Subreddit name</InputLabel>
              <Input id="subredditName" onChange={this.handleChange} />
              <FormHelperText className="helping">helper</FormHelperText>
              <Button onClick={this.getInputReddit}>Submit</Button>
              </FormControl>
              <div id="results">Top results of all time.</div>
          </div>
      </div>
    );
  }

  public displayResults(responseJSON: any){

    const container = document.getElementById('results')
                        // tslint:disable-next-line:no-console 
                        console.log("child card "+ responseJSON.kind);

    for(let i=0;i<25;i++){
      const postCard = document.createElement('a')
      postCard.href = `https://www.reddit.com` + responseJSON.data.children[i].data.permalink
      postCard.classList.add('post-Card')
      postCard.innerText = `` + responseJSON.data.children[i].data.title
      if(container !==null){
        container.appendChild(postCard);
      }
    }
  }

}