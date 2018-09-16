import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import * as React from 'react';


interface IState {
  results: any,
  subreddit: any,
  name: any,
  container: any,
  responseJSON: any,
}

export default class FirstComponent extends React.Component<{}, IState> {
  
  constructor(props: any) {
    super(props);
  
    this.state = {
      results: "",
      name: "",
      subreddit: "",
      container: "",
      responseJSON: "",

    };
    this.handleChange = this.handleChange.bind(this);
    this.getInputReddit = this.getInputReddit.bind(this)
    this.fetchsubreddit = this.fetchsubreddit.bind(this)
    this.displayResults = this.displayResults.bind(this)
  }
  // Stores the value of what is in the input field into the 'subreddit' field.
  public handleChange = (e: any): void => {
    this.setState({
      subreddit: e.currentTarget.value
    });
  };

  // Checks if there is any text in the field, if there is it passes it onto the fetchsubreddit method.
  // This prevents it from sending null to the fetchsubreddit method.  
  public getInputReddit() {
    if(this.state.subreddit!==null){
      this.fetchsubreddit(this.state.subreddit)
    }
  };

  // Fetches the JSON data from the reddit API and passes it on to the displayResults method.
  // This is a basic search so no API key is required.
  public fetchsubreddit= async (subreddit: string) => {
    const response = await fetch('https://www.reddit.com/r/' + subreddit + '/new.json')
    const responseJSON = await response.json()
    this.displayResults(responseJSON)
  };


  public render() {
    return (
      <div className="container-fluid" >
            <div className="subredditField">
              <FormControl margin={"normal"} >
              <InputLabel className="textfield" >Subreddit name</InputLabel>
              <Input id="subredditName" onChange={this.handleChange} />
              <Button onClick={this.getInputReddit}>Submit</Button>
              </FormControl>
              <div id="results">Newest results.</div>
          </div>
      </div>
    );
  }

  // Displays the results recieved from the reddit API into a human readable format. The user
  // Is able to view the title and is able to click on it to go to the actual page.
  // It is also placed lower than render() to ensure that the page fully loads as
  // An existing container is used in this method.
  public displayResults(responseJSON: any){

    const container = document.getElementById('results')
    while (container.firstChild) {
      container.removeChild(container.firstChild);
  }
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