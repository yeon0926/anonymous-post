import React, {Component} from 'react';
import styles from './PostView.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class PostMake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DARK: true,
      input: '',
      comments: [
        {text:'aaaaa'},
      ]
    }
  }

  handleChangeLight = (e) => {
    this.setState({DARK: false});
  }

  handleChangeDark = (e) => {
    this.setState({DARK: true});
  }

  handleChange = (e) => {
    this.setState({
      input : e.target.value
    })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (this.state.input === "") {
        alert('다시 입력해주세요')
      }
      else {
        const {comments, input} = this.state;

        const newCommnet = {
          text: input
        };
        this.setState({
          comments: [newCommnet, ...comments],
          input: ''
        });
      };
    }
  }

  componentDidMount() {
    const res = fetch('/api/main', {
      method: 'post',
      headers: { 'Content-Type' : 'application/json' },
      body: {
        pageNum : this.state.pageNum,
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.id;
      return responseJson.title;
      return responseJson.date;
      return responseJson.commany;
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    let DARKCOLOR = this.state.DARK ? "hidden" : "visible";
    let LIGHTCOLOR = this.state.DARK ? "visible" : "hidden";
    let FONTCOLOR = this.state.DARK ? "white" : "black";
    let BACKCOLOR = this.state.DARK ? "#adb5bd" : "white";
    let FRONTCOLOR = this.state.DARK ? "#212529" :  "#ced4da";
    let BACKSWITCHCOLOR = this.state.DARK ? "#adb5bd" : "#868e96";

    const postelements = [];

    postelements.push(
      <tr>
        <th style={{borderColor: FONTCOLOR}} className={cx('post_in_date')}>{"0000-00-00"}</th>
        <th style={{borderColor: FONTCOLOR}} className={cx('post_in_title')}>{"OOOOO"}</th>
        <th style={{borderColor: FONTCOLOR}} className={cx('commet_in_number')}>{"0000"}</th>
      </tr>
    );

    const posttext = [];
    const test =
`안녕하세요.
노래하는 ㅇㅇㅇ 입니다.
저희 이어콘서트는 이어폰을 꽃고 들으시면 더욱 생생한 라이브를 들으실 수 있습니다.`

    posttext.push(
      <tr>
        <th colSpan="3" className={cx('post_context')}><textarea style={{color:FONTCOLOR}} className={cx('post_in_context')} value={test} readOnly/></th>
      </tr>
    );

    const {comments} = this.state;
    const commentsList = comments.map(
      comment => (
        <input style={{color: FONTCOLOR, borderColor: FONTCOLOR}} className={cx('commentList')} value={comment.text} readOnly/>
      )
    );

    const back = "<--이전글"
    const next = "다음글-->"

    return (
      <div style={{backgroundColor: BACKCOLOR}} className={cx('post_back_color')}>
        <div style={{backgroundColor:FRONTCOLOR, color:FONTCOLOR}} className={cx('post_front_color')}>
          <div style={{backgroundColor: BACKSWITCHCOLOR}} className={cx('post_switch_back')}></div>
          <input style={{visibility: LIGHTCOLOR}} className={cx('post_switch_light_btn')} onClick={this.handleChangeLight} readOnly/>
          <input style={{visibility: DARKCOLOR}} className={cx('post_switch_dark_btn')} onClick={this.handleChangeDark} readOnly/>

          <table style={{borderColor: FONTCOLOR}} className={cx('post_table')}>
            <thead>
              {postelements}
            </thead>
            <tbody>
              <tr>
                <th colSpan="3" style={{borderColor: FONTCOLOR}} className={cx('post_line')}></th>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th colSpan="3" style={{borderColor: FONTCOLOR}} className={cx('post_two_line')}></th>
              </tr>
            </tbody>
            <tbody>
              {posttext}
            </tbody>
            <tbody>
              <tr>
                <th colSpan="3" style={{borderColor: FONTCOLOR}} className={cx('post_bottom_line')}></th>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th colSpan="3" style={{borderColor: FONTCOLOR}} className={cx('post_two_line')}></th>
              </tr>
            </tbody>
          </table>
          <div className={cx('post_comment_inout')}>
            <input style={{color:FONTCOLOR, borderColor:FONTCOLOR}} className={cx('comment_input')} onKeyPress={this.handleKeyPress} onChange={this.handleChange} value={this.state.input} placeHolder="엔터 => 댓글"/>
          </div>
          <div style={{borderColor:FONTCOLOR}} className={cx('commentsList')}>
            {commentsList}
          </div>
          <div className={cx('backnext_btn')}>
            <div style={{color:FONTCOLOR}} className={cx('back_btn')}>{back}</div>
            <div style={{color:FONTCOLOR}} className={cx('next_btn')}>{next}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostMake;
