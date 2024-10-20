import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  state = {
    progress: 0,
  }
  setProgress =(progress)=>{
    this.setState({progress: progress});
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
          height={3}
          color='#f11946'
          progress={this.state.progress}
        
      />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey="6afd466d46c540e489503c56fd4f2e62" key="general" pageSize={6} country="india" category=""/>} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey="6afd466d46c540e489503c56fd4f2e62" key="business" pageSize={6} country="in" category="business"/>} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey="6afd466d46c540e489503c56fd4f2e62" key="entertainment" pageSize={6} country="in" category="entertainment"/>} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey="6afd466d46c540e489503c56fd4f2e62" key="general" pageSize={6} country="in" category="general"/>} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey="6afd466d46c540e489503c56fd4f2e62" key="health" pageSize={6} country="in" category="health"/>} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey="6afd466d46c540e489503c56fd4f2e62" key="science" pageSize={6} country="in" category="science"/>} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey="6afd466d46c540e489503c56fd4f2e62" key="sports" pageSize={6} country="in" category="sports"/>} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey="6afd466d46c540e489503c56fd4f2e62" key="technology" pageSize={6} country="in" category="technology"/>} />
          </Routes>
        </Router>
      </div>
    );
  }
}
