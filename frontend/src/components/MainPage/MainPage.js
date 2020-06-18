import React, {Component} from 'react';
import styles from './MainPage.scss';
import { Link } from "react-router-dom";
import classNames from 'classnames/bind';

const axios = require('axios');

const cx = classNames.bind(styles);

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DARK: true,
      arrs: [
        {
          id: 0,
          date: "",
          title: "",
          comment: ""
        },
      ],
      pageNum: 1,
    }
  }

  handleChangeLight = (e) => {
    this.setState({DARK: false});
  }

  handleChangeDark = (e) => {
    this.setState({DARK: true});
  }

  handleBack = (e) => {
    const { pageNum } = this.state;

    this.setState({
      pageNum: this.state.pageNum - 1
    });

    axios.post('/api/main', {
      pageNum: pageNum - 1
    })
    .then(function (response) {
      console.log(response);
      return response.id;
      return response.title;
      return response.date;
      return response.commany;
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handleNext = () => {
    const { pageNum } = this.state;

    this.setState({
      pageNum: pageNum + 1
    });
    console.log(pageNum);

    axios.post('/api/main', {
      pageNum: pageNum + 1
    })
    .then(function (response) {
      console.log(response);
      return response.id;
      return response.title;
      return response.date;
      return response.commany;
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  componentDidMount() {
    const {pageNum} = this.state;

    axios.post('api/main', {
      pageNum: pageNum
    })
    .then(function (response) {
      console.log(response);
      return response.id;
      return response.title;
      return response.date;
      return response.commany;
    })
    .catch(function (error) {
      console.log(error);
    });

    // const {arrs} = this.state;
    //
    // const newArrs = {
    //   id:1,
    //   date: "2020-03-19",
    //   title: "1차 시도",
    //   comment: "0000"
    // };
    //
    // this.setState({
    //   arrs : [newArrs, ...arrs],
    //   date: '',
    //   title: '',
    //   comment: '',
    // });
  }

  render() {
    let DARKCOLOR = this.state.DARK ? "hidden" : "visible";
    let LIGHTCOLOR = this.state.DARK ? "visible" : "hidden";
    let FONTCOLOR = this.state.DARK ? "white" : "black";
    let BACKCOLOR = this.state.DARK ? "#adb5bd" : "white";
    let FRONTCOLOR = this.state.DARK ? "#212529" :  "#ced4da";
    let BACKSWITCHCOLOR = this.state.DARK ? "#adb5bd" : "#868e96";

    const {arrs} = this.state;

    const arrsList = arrs.map(
      arr => (
        <tr>
          <th className={cx('target_date', 'th_size')}>{this.state.date}</th>
          <th id={this.state.id} className={cx('target_tilte', 'th_size')}><Link to={`/post`}  style={{textDecoration: 'none', color: FONTCOLOR}}>{this.state.title}</Link></th>
          <th className={cx('target_comment', 'th_size')}>{this.state.commany}</th>
        </tr>
      )
    );

    return (
      <div style={{backgroundColor: BACKCOLOR}} className={cx('main_back_color')}>
        <div style={{backgroundColor:FRONTCOLOR, color:FONTCOLOR}} className={cx('main_front_color')}>
          <div style={{backgroundColor: BACKSWITCHCOLOR}} className={cx('main_switch_back')}></div>
          <input style={{visibility: LIGHTCOLOR}} className={cx('main_switch_light_btn')} onClick={this.handleChangeLight} readOnly/>
          <input style={{visibility: DARKCOLOR}} className={cx('main_switch_dark_btn')} onClick={this.handleChangeDark} readOnly/>
          <div className={cx('title')}>익명 게시판</div>
          <p className={cx('notice')}>글쓰기는 "localhost:3000/makepost"</p>
          <table style={{borderColor: FONTCOLOR}} className={cx('main_table')}>
            <tr>
              <th style={{borderColor: FONTCOLOR}} className={cx('post_date')}>작성일</th>
              <th style={{borderColor: FONTCOLOR}} className={cx('post_title')}>제목</th>
              <th style={{borderColor: FONTCOLOR}} className={cx('commet_number')}>댓글수</th>
            </tr>
            <tr>
              <th style={{borderColor: FONTCOLOR}} colSpan="3" className={cx('main_line')}></th>
            </tr>
            <tr>
              <th style={{borderColor: FONTCOLOR}} colSpan="3" className={cx('main_two_line')}></th>
            </tr>
            {arrsList}
          </table>
          <div>
            <div style={{borderColor: FONTCOLOR}} className={cx('main_bottom_line')}></div>
            <div style={{borderColor: FONTCOLOR}} className={cx('main_bottom_line','main_two_bottom_line')}></div>
          </div>
          <div className={cx('page_number')}>
            <span onClick={this.handleBack} className={cx('left_button')} >{[<span>&lt;</span>]}</span>
            <span className={cx('page_number_btn')}>{this.state.pageNum}</span>
            <span onClick={this.handleNext} className={cx('right_button')}>{[<span>&gt;</span>]}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
