import React, { Component } from 'react';
import Proptypes from 'prop-types';

import api from '../utils/api';

function SelectLanguage(props) {
    let languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
    return(
            <ul className="languages">
                {languages.map((lang)=>{
                    return(
                    <li 
                    style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
                    onClick={props.onSelect.bind(null, lang)}
                    key={lang}>
                        {lang}
                    </li>
                    )
                })}
            </ul>
        )
}

SelectLanguage.proptypes = {
    selectedLanguage: Proptypes.string.isRequired,
    onSelect: Proptypes.func.isRequired
}


function RepoGrid(props) {
    return(
        <ul className='popular-list'>
            {props.repos.map((repo,index) => {
                return(
                    <li key={repo.name} className="popular-item">
                        <div className="popular-rank">#{index + 1}</div>
                        <ul className="space-list-item">
                            <li>
                                <img
                                    className='avatar'
                                    src={repo.owner.avatar_url}
                                    alt={`Avatar for ${repo.owner.login}`}
                                />
                            </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

RepoGrid.proptypes = {
    repos: Proptypes.array.isRequired
}
class Popular extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: ''
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(lang){
        this.setState(function () {
            return {
                selectedLanguage: lang,
                repos: null
            }
        });

        api.fetchPopularRepos(lang)
            .then((repos) => {
                this.setState(()=>{
                    return{
                        repos: repos
                    }
                })
            })
    }
    render(){
        return(
            <div>
                <SelectLanguage
                    selectedLanguage = {this.state.selectedLanguage}
                    onSelect = {this.updateLanguage}
                />
                
                {!this.state.repos
                    ? <p>LOADING</p>
                    : <RepoGrid repos={this.state.repos}/>
                }
            </div>
        )
    }
}

export default Popular;