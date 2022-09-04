import React from 'react';
import s from './Users.module.css'
import * as axios from 'axios'
import { useEffect } from 'react';
import User from './User/User';
import Preloader from '../common/Preloader';

const Users = (props) => {
  useEffect(()=>{
      props.isFetching(true)
    axios.get(`https://social-network.samuraijs.com/api/1.0/users/?page=${props.social.currentPageNum}`).then(response =>{
      props.setUsersToState(response.data.items)
      props.setTotalUsersCount(response.data.totalCount)
      props.isFetching(false)
      console.log('asdads');

    })
  },[props.social.currentPageNum])


  const pages = []
  for(let i = 0; i <= Math.ceil(props.social.totalUsersCount / 10); i++){
    pages.push(i+1)
  }

  // Show preloader when something loading
  if(props.social.isFetching){
    return <Preloader/>
  }

  return (
    <div>
      <div className={`${s.users} block`}>
        <div className='title'>
          Users
        </div>

        <div className={s.body}>
          <div className={s.pages}>
            {pages.map(page => {
              return <div className={page === props.social.currentPageNum ? `${s.page} ${s.page_active}` : s.page} key={page} onClick={() => props.setCurrentPageNum(page)} >
                {page}
              </div>
            })}
          </div>
          {props.social.usersList.map((user,i) => 
            <User {...props} user={user} key={i}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;