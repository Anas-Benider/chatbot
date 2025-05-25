css = '''
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
<style>
body {
    background-color: #f8f9fa;
}
.chat-box {
    margin: 20px auto;
    width: 60%;
}
.chat-message {
    padding: 1.5rem; 
    border-radius: 0.5rem; 
    margin-bottom: 1rem; 
    display: flex;
}
.chat-message.user {
    background-color: #2b313e;
}
.chat-message.bot {
    background-color: #475063;
}
.chat-message .avatar {
    width: 20%;
}
.chat-message .avatar img {
    max-width: 78px;
    max-height: 78px;
    border-radius: 50%;
    object-fit: cover;
}
.chat-message .message {
    width: 80%;
    padding: 0 1.5rem;
    color: #fff;
}
</style>
'''

bot_template = '''
<div class="chat-message bot">
    <div class="avatar">
        <img src="https://ih1.redbubble.net/image.5458607846.3867/st,small,507x507-pad,600x600,f8f8f8.jpg" style="max-height: 78px; max-width: 78px; border-radius: 50%; object-fit: cover;">
    </div>
    <div class="message">{{MSG}}</div>
</div>
'''

user_template = '''
<div class="chat-message user">
    <div class="avatar">
        <img src="https://media.licdn.com/dms/image/D4E03AQFOixyF1GtNDQ/profile-displayphoto-shrink_200_200/0/1695887057610?e=2147483647&v=beta&t=5iRnXkzL2IXQbfEVhybese5ggiuFKZCMYTjzjlJp3oE">
    </div>    
    <div class="message">{{MSG}}</div>
</div>
'''
