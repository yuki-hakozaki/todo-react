const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { v4: uuid } = require('uuid');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(multer().none());
app.use(express.static('web'));
app.use(cors());
app.use(bodyParser.json());

// データベースファイルのパス
const dbPath = path.resolve(__dirname, 'db.sqlite');

// データベースの初期化
const db = new sqlite3.Database(dbPath);

// テーブルの作成
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS todos (id TEXT, title TEXT, done INTEGER)');
});

// http://localhost:3001/api/v1/list にアクセスしてきたときに
// TODOリストを返す
app.get('/api/v1/list', (req, res) => {
  // データベースからTODOリストを取得
  db.all('SELECT id, title, done FROM todos', (err, rows) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json(rows);
    }
  });
});

// http://localhost:3001/api/v1/add にデータを送信してきたときに
// TODOリストに項目を追加する
app.post('/api/v1/add', (req, res) => {
  const todoData = req.body;
  const todoTitle = todoData.title;
  const id = uuid();
  const done = false;

  // データベースにTODO項目を追加
  db.run('INSERT INTO todos (id, title, done) VALUES (?, ?, ?)', [id, todoTitle, done], (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const todoItem = { id, title: todoTitle, done };
      console.log('Add: ' + JSON.stringify(todoItem));
      res.json(todoItem);
    }
  });
});

// http://localhost:3001/api/v1/item/:id にDELETEで送信してきたときに
// 項目を削除する。:idの部分にはIDが入る
app.delete('/api/v1/item/:id', (req, res) => {
  const id = req.params.id;

  // データベースからTODO項目を削除
  db.run('DELETE FROM todos WHERE id = ?', [id], (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      console.log('Delete: ' + id);
      res.sendStatus(200);
    }
  });
});

// http://localhost:3001/api/v1/item/:id にPUTで送信してきたときに
// 項目の状態を更新する。:idの部分にはIDが入る
app.put('/api/v1/item/:id', (req, res) => {
  const id = req.params.id;
  const done = req.body.done === true ? 1 : 0;

  // データベースでTODO項目のdone状態を更新
  db.run('UPDATE todos SET done = ? WHERE id = ?', [done, id], (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      console.log('Edit: ' + id);
      res.sendStatus(200);
    }
  });
});

// ポート3001でサーバを立てる
app.listen(3001, () => console.log('Listening on port 3001'));
