
import { Component, Prop } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';


@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css'
})
export class AppProfile {

  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;

  render() {
    if (this.match && this.match.params.name) {
      return (
        <div class='app-profile'>
          <p>
            Hello! My name is {this.match.params.name}.
            My name was passed in through a route param!
          </p>
        </div>
      );
    }
    else if (
      this.history
      && this.history.location
      && this.history.location.state
      && this.history.location.state.name) {
      return (
        <div class='app-profile'>
          <p>
            Hello! My name is {this.history.location.state.name}.
            My name was passed in through router history!
            </p>
        </div>
      );
    }
  }
}