import React, { Component } from 'react'
import axios from 'axios';
import styled, { injectGlobal } from 'styled-components';
import Notifications, { notify } from 'react-notify-toast';
import SearchIcon from '../images/s2.png';
import JuaFont from '../font/jua.ttf'

injectGlobal`
  @font-face {
    font-family: 'Jua';
    src: url(${JuaFont});
  }

  body {
    font-family: 'Jua' ,sans-serif;
    padding: 0;
    margin: 0;
    background-color: #e6ecf0;
    overflow-x: hidden
  }
`
const Navbar = styled.div`
  text-align:center;
  height: 53px;
  box-shadow: 0 15px 50px 0 rgba(213,216,228,.3);
  background-color: white;
  padding-top: 12px;
`;

const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  
`;

const SearchButton = styled.input`
  position:relative;
  left:10px;
  width: 570px;
  height: 40px;
  display:inline-block;
  border: none;
  text-align: center;
  font-size: 21px;
  background: url(${SearchIcon}) no-repeat scroll 2px 2px;
  background-position-y: 12px;
  background-position-x: 20px;
  background-color: #e6ecf0;
  
`;

const PostBoxContainer = styled.div`
  width: 570px;
  margin:40px auto;
`;

const Section = styled.section`
  background-color: white;
  box-shadow: rgba(213, 216, 228, 0.3) 0px 15px 50px 0px;
  height: inherit;
  text-align: left;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(237, 237, 237, 0.2);
  border-image: initial;
  margin: 5em auto;
  font-weight: 200
`;

const WriteBox = styled.textarea`
  width: 545px;
  height: 160px;
  border: none;
  padding: 10px;
  resize: none;
  font-size: 15px;
  display: block;
  &:focus {
    outline: none
  }
  
`;

const Header = styled.div`
  font-weight: bold;
  height: 20px;
  padding-left: 30px;
  padding:10px;
  border-bottom: 1px solid rgba(237, 237, 237, 0.8);
  font-weight: 200;
  
`;
const Bottom = styled.div`
  height: 30px;
  margin: 0 auto;
  padding-left: 30px;
  padding:10px;
  text-align:right;
  border-top: 1px solid rgba(237, 237, 237, 0.8);
`;

const TimeBottom = styled.div`
height: 30px;
margin: 0 auto;
padding-left: 30px;
padding:10px;
text-align:center;
border-top: 1px solid rgba(237, 237, 237, 0.8);
`;

const PostBox = styled.div`
  width: 545px;
  padding: 10px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(213, 216, 228, 0.3) 0px 15px 50px 0px;
  height: inherit;
  text-align: left;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(237, 237, 237, 0.2);
  border-image: initial;
  margin: 0 auto;
`;

const WriteButton = styled.button`
  background-color: rgb(82,158,204);
  color: white;
  width: 80px;
  height: 35px;
  border: none;
  font-weight: bold
`;

const Title = styled.p`
  font-size: 30px;
  margin-top: -5px;
  font-weight: 200;
`

const LikeButton = styled.button`
  border: none
`;

const SearchPostResult = styled.div`

`;


const server = 'http://youngseo.crong.kr:3000/'
export default class Home extends Component {
  state = {
    posts: [],
    loading: true,
    search: true,
    post: '',
    result: [],
  }

  componentDidMount = (e) => {
    axios.get(server + 'board')
    .then(res => {
      const posts = res.data;
      this.setState({
        posts, loading: false
      })
    })
  }

  handleChange = (e) => {
    this.setState({ post: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const post = {
      title: '',
      description: this.state.post,
    }

    axios.post(server + 'board', post, {
      headers: {
          'Content-Type': 'application/json',
    }})
    .then(res => {
      notify.show('글 등록 완료', 'success', 1000);
      
      setTimeout(function() {
        window.location.reload()
      }, 1000);
    })
  }

  handleLikeClick = (e) => {
    axios.get(server + 'board/' + e.target.value + '/like')
    .then(res => {
      notify.show('좋아요 완료', 'success', 3000);
      
      setTimeout(function() {
        window.location.reload()
      }, 2000);
    })
  }

  handleScrollTop = (e) => {
    window.scrollTo(0, 0)
  }

  handleSearch = (e) => {
    alert('a')
  }

  handleKeyPressAndSearch = (e) => {
    if(e.key == 'Enter'){
      alert(e.target.value)
      axios.get(server + 'board/search/' + e.target.value)
      .then(res => {
        const result = res.data;
        console.log(result)
        this.setState({
          result, search: false
        })
      })
    }
  }

  render() {
    let postData = [...this.state.posts]
    postData.sort((a,b) => b.board_idx - a.board_idx)
    return (
      <div>
        <Notifications />
        <Navbar>
          <SearchButton placeholder="검색" onChange={this.handleKeyPressAndSearch} onKeyPress={this.handleKeyPressAndSearch} />
        </Navbar>
        <Container>
          <PostBoxContainer>
            <Section>
              <Header>
                <Title>별소리</Title>
              </Header>
            <form onSubmit={this.handleSubmit}>
              <WriteBox placeholder="사연을 입력 해주세요" onChange={this.handleChange}/>
              <Bottom>
              <WriteButton>포스팅</WriteButton>
              </Bottom>
            </form>
            </Section>

            <Section>
            <Header>
                기록들 ..
            </Header>
            <SearchPostResult>
              { this.state.search ? '' : this.state.result.map((post) =>
                <PostBox key={post.board_idx}><pre>{post.board_des}</pre><LikeButton onClick={this.handleLikeClick} value={post.board_idx}>♡ {post.board_hit}</LikeButton></PostBox>) }
            </SearchPostResult>
              { 
                this.state.loading ? 'loading.. ' : 
                postData.map((post) =>
                <PostBox key={post.board_idx}><pre>{post.board_des}</pre><LikeButton onClick={this.handleLikeClick} value={post.board_idx}>♡ {post.board_hit}</LikeButton></PostBox>)
              }
              <TimeBottom onClick={this.handleScrollTop}>
                위로...
              </TimeBottom>
              </Section>
          </PostBoxContainer>
        </Container>
      </div>
    )
  }
}