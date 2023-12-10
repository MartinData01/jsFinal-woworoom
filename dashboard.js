import axios from 'axios';
import c3 from 'c3'

import { sweetalert2 } from './main.js';

const api_path = "macshop";
const baseUrl = "https://livejs-api.hexschool.io/api/livejs/v1/admin";
const config = {
  headers: {
    Authorization: 'vsNAE5TYeFVS8JSKfFuoVS3R0To1'
  }
}

// 請同學自行組出資料，不可直接寫死資料
c3.generate({
  bindto: '#chart',
  data: {
    columns: [
        ['床架', 45],
        ['收納', 35],
        ['窗簾', 20],
    ],
    type : 'pie',
  }
});



//GET 後台取得訂單


// PUT 修改訂單狀態


// DELETE 刪除單一訂單


//DELETE 清除全部訂單

