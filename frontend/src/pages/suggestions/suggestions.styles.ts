import styled from "styled-components";

export const SuggestionsPageContainer = styled.div`
display:flex;

justify-content:space-between;

padding:0 2rem;
margin-top:4rem;
.actions{
    min-width:600px;


    .form{
        max-width: 40rem;
        input{
            display:block;
            padding:1rem 2rem 1rem 1rem;
         width:100%;
            margin-bottom:1rem;
        }

        .insight-btn{
            width:100%;
        }
    }

    .history{
        margin-top:4rem;
        h2{
            font-size:1.8rem;
            font-weight:600;
            margin-bottom:2rem;
        }
    }
}


.response{
    .results{
        background-color:#242424;
        padding:2rem 4rem;

        ul{
            li{
                font-size:1.4rem;
                line-height:20px;
                margin-bottom:2rem;
            }
        }
    }
}

`

export const HistoryCard = styled.div`
    border: 1px solid rgb(115, 114, 115);
    margin-bottom:1rem;
padding: 2rem;
max-width:40rem;
overflow:hidden;
.title{
    font-size: 1.4rem;
    font-weight:600

}

.link{
    font-weight:400;
    color:#eee;
    font-size: 1.4rem;  
    margin-top:1rem;
    text-overflow:ellipsis;
}
`