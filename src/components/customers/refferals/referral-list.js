import React, {useEffect, useState} from 'react'
import userService from "../../../services/user-services";
import {useNavigate} from "react-router-dom";

const ReferralList = () => {
    const [referralCache, setReferralCache] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        userService.profile()
            .catch(error => {
                alert("Not logged In!")
                navigate('/')
            })
            .then(profile => {
                if (profile) {
                    setReferralCache(profile.referrals)
                    console.log(profile.referrals)
                }
            })
    }, [navigate])
    return (
        <>
            <div>
                <h1>My referrals</h1>

                {
                    referralCache.length === 0 &&
                    <>
                        <h3>No referrals yet. Invite your friends and save more!</h3>
                    </>
                }

                {
                    referralCache.length !== 0 &&
                    <>
                        <table className="table">
                            <thead>
                            <tr className='d-flex'>
                                <td className='col'>
                                    <div className='fa fa-user-friends me-1'/>username
                                </td>
                                <td className='col'>
                                    <div className='fa fa-calendar me-1'/>Joined date
                                </td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                referralCache.map(referral =>
                                                      <tr className='d-flex'>
                                                          <td className='col'>
                                                              <h5>{referral.username}</h5>
                                                          </td>
                                                          <td className='col'>
                                                              <h5>{referral.created.split(
                                                                  'T')[0]}</h5>
                                                          </td>
                                                      </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </>
                }
            </div>
        </>
    )
}

export default ReferralList