import React, {Component} from 'react';
import { Link } from "react-router-dom";
import styles from './PostMake.scss';
import classNames from 'classnames/bind';

const axios = require('axios');

const cx = classNames.bind(styles);

class PostMake extends Component {
  constructor(props) {
    super(props);

    var today = new Date();

    var year = today.getFullYear();
    var month = today.getMonth() +1;
    var day = today.getDate();

    if(month<10)
      month = "0" + month;
    if(day<10)
      day = "0" + day;

    var getToday = year + "-" + month + "-" + day;

    this.state = {
      DARK: true,
      title: '',
      context: '',
      date: getToday,
    }
  }

  handleChangeLight = (e) => {
    this.setState({DARK: false});
  }

  handleChangeDark = (e) => {
    this.setState({DARK: true});
  }

  handleTitle = (e) => {
    this.setState({title: e.target.value});
  }

  handleContext = (e) => {
    this.setState({context: e.target.value});
  }

  handleWriteDown = () => {
    const {title, context, date} = this.state;

    console.log(this.state.title);
    console.log(this.state.context);
    console.log(this.state.date);

    // axios({
    //   method:'post',
    //   url: 'api/writePost',
    //   data: {
    //     date: this.state.date,
    //     title:this.state.title,
    //     text: this.state.context
    //   }
    // })
    // .then( response => { console.log(response) })
    // .catch( response => { console.log(response) });

    axios.post('/api/writePost', {
        date: date,
        title: title,
        text: context,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({
      title: '',
      context: ''
    });
  }

  render() {
    let DARKCOLOR = this.state.DARK ? "hidden" : "visible";
    let LIGHTCOLOR = this.state.DARK ? "visible" : "hidden";
    let FONTCOLOR = this.state.DARK ? "white" : "black";
    let BACKCOLOR = this.state.DARK ? "#adb5bd" : "white";
    let FRONTCOLOR = this.state.DARK ? "#212529" :  "#ced4da";
    let BACKSWITCHCOLOR = this.state.DARK ? "#adb5bd" : "#868e96";

    return (
      <div style={{backgroundColor: BACKCOLOR}} className={cx('make_back_color')}>
        <div style={{backgroundColor:FRONTCOLOR, color:FONTCOLOR}} className={cx('make_front_color')}>
          <div style={{backgroundColor: BACKSWITCHCOLOR}} className={cx('make_switch_back')}></div>
          <input style={{visibility: LIGHTCOLOR}} className={cx('make_switch_light_btn')} onClick={this.handleChangeLight} readOnly/>
          <input style={{visibility: DARKCOLOR}} className={cx('make_switch_dark_btn')} onClick={this.handleChangeDark} readOnly/>
          <form action="/api/writePost" method="post">
            <table style={{borderColor: FONTCOLOR}} className={cx('make_table')}>
              <thead>
                <tr>
                  <th>
                    <input style={{color: FONTCOLOR}} className={cx('make_title')} name="title" placeHolder="제목을 적어주세요" value={this.state.title} onChange={this.handleTitle}/>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th style={{borderColor: FONTCOLOR}} className={cx('make_line')}></th>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th style={{borderColor: FONTCOLOR}} className={cx('make_two_line')}></th>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th>
                    <textarea style={{color: FONTCOLOR}} className={cx('make_context')} name="contents" placeHolder="자유롭게 적어주세요" value={this.state.context} onChange={this.handleContext}/>
                  </th>
                </tr>
              </tbody>
            </table>
          </form>
          <div style={{borderColor:FONTCOLOR}} className={cx('make_bottom_line')}></div>
          <Link to="/" style={{color:FONTCOLOR}} className={cx('make_submit_btn')} onClick={this.handleWriteDown}>글쓰기</Link>
        </div>
      </div>
    );
  }
}

export default PostMake;
