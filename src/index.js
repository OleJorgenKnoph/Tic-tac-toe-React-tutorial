import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Square extends React.Component {

  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick({value: 'X'})}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }

  handleClick(i){
    const squares = this.state.squares.slice();

    if(calulateWinner(squares) || squares[i]){
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calulateWinner(this.state.squares);
    let status;

    if (winner){
      status = 'The winner is ' + winner;
    }
    else if (checkTie(this.state.squares)){
      status = 'Its a tie';
    }
    else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calulateWinner(squares) {
  const winningLines =[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,4,8],
      [2,4,6],
      [0,3,6],
      [1,4,7],
      [2,5,8]
    ];

  for (let i = 0; i < winningLines.length; ++i){
    const [a,b,c] = winningLines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

function checkTie(squares) {
  let tieScore = 0;
  for (let i = 0; i < 9; ++i){
    if (squares[i] != null){
      tieScore++;
    }
  }

  return tieScore === 9;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
