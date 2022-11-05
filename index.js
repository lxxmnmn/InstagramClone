// querySelector(): 여러 개 중 첫번째 요소만 반환
// querySelectorAll(): 여러 개를 반환하기 때문에 반복문 사용해야 함
const likeBtn = document.querySelectorAll('.like_btn');
const replyForm = document.querySelectorAll('.reply_form');
let replyTestId = 1;

/** 좋아요 표시 함수 */
function addLike() {
    let likeState = this.firstChild.getAttribute('src');
    let likeCnt = this.parentElement.parentElement.parentElement.querySelector('.feed_like').querySelector('.like_count').innerHTML;
    const heart = 'https://img.icons8.com/small/32/null/like--v1.png';
    const filledHeart = 'https://img.icons8.com/color/48/null/filled-like.png';

    if (likeState == heart) {
        this.firstChild.setAttribute('src', filledHeart);
        this.parentElement.parentElement.parentElement.querySelector('.feed_like').querySelector('.like_count').innerHTML = Number(likeCnt) + 1;
    } else if (likeState == filledHeart) {
        this.firstChild.setAttribute('src', heart);
        this.parentElement.parentElement.parentElement.querySelector('.feed_like').querySelector('.like_count').innerHTML = Number(likeCnt) - 1;
    }
}

/** 댓글 추가 함수 */
function addReply(event) { //event: 이벤트가 실행될 때의 정보를 담고 있는 이벤트 객체
    event.preventDefault();
    let replyCnt = this.parentElement.parentElement.querySelector('.reply_more.txt_gray').querySelector('.reply_count').innerHTML;
    const replyData = new FormData(event.target); //target: 이벤트가 발생한 대상 객체
    const replyContent = String(replyData.get('reply_input'));
    const replyList = event.target.parentElement.parentElement.querySelector('.feed_reply');
    const newReplyTag = document.createElement('p');

    newReplyTag.innerHTML = `<span class="reply_id">test_${replyTestId}</span> ${replyContent}`;
    replyList.append(newReplyTag); //댓글 추가
    event.target.querySelector('.reply_input').value = ''; //댓글 입력창 초기화
    this.parentElement.parentElement.querySelector('.reply_more.txt_gray').querySelector('.reply_count').innerHTML = Number(replyCnt) + 1;
    replyTestId++;
}

likeBtn.forEach(element => {
    element.addEventListener('click', addLike);
});

replyForm.forEach(element => {
    element.addEventListener('submit', addReply);
});