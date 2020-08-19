/*
 * @file: api
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2020年07月16 22:23:54
 */

import { get } from '@/utils/request';

export default (data = {}) => get('home/demo/api', data);
