�Q�lURL https://gihyo.jp/dev/feature/01/milkcocoa-baas/0010?page=2

# milkcocoa�̓o�^
- https://mlkcca.com �ɐڑ�
- �V�K�o�^�Ń��[�U�[�o�^������
- �V�����A�v������� �ŁA�A�v��������͂��č쐬

# ����m�F�̂��߁A�`���b�g���쐬
- Milkcocoa�̃`���[�g���A���ɂ��������āA�`���b�g���쐬

# ����܂ł̃`���b�g��\��
- ���[�U�[�F�؂����Ȃ��ƃf�[�^��ǂݏo���Ȃ��Ȃ邱�Ƃ��m�F���邽�߂ɁA���[�U�[�F�؂�ǉ�����
- �ȉ��̃R�[�h��main.js�ɒǉ�
function getChatAll() {
    chatDataStore.stream().next(
        function (err, data) {
            for (var i = 0 ; i < data.length ; i++) {
                addText(data[i].value.message);
            }
        }
    );
}
- window.onload�֐��̍Ō�ɁAgetChatAll()�̌Ăяo����ǉ�

# Auth0�ɂ��Ċm�F
- �F�؂�Auth0�Ƃ����T�[�r�X�𗘗p����B�����܂��ȗ�����ȉ��̃`���[�g���A���Ŋm�F����B
https://auth0.com/docs


# �e�X�g�A�v����URL�Ɍ��J
- �F�؎��ɋ�����URL���K�v�Ȃ̂ŁAgithub pages�ȂǂɁA�T���v�����A�b�v���Ă���


# ���[�U�[�F�؂�����
- https://mlkcca.com/document/start-js-auth.html ���Q�Ƃ��āA�쐬�����A�v���p�̏���o�^����
## �o�^�菇
- [auth0](https://auth0.com/) ���J���āA[CREATE FREE ACCOUNT]�Ŗ����A�J�E���g���쐬����
- Github�AGoogle+�AMicrosoft�A�J�E���g�̂����ꂩ�ŔF�؂��邩�A���[���A�h���X�ƐV�K�̃p�X���[�h�œo�^����
- Regin�͑I�������Ȃ��̂�US West�Bdomain�͔C�ӂ̂��̂�o�^���Ă���
- �A�g���������T�[�r�X��I������[Save]
- �o�^���I���Ɖ�ʂ��؂�ւ��̂ŁA���̃��j���[����[Apps/APIs]��I��
- �E���[+ NEW APP/API]���N���b�N
- �V�K�ɍ쐬����̂�[CREATE A NEW APP/API]������
- �쐬���Ă���A�v���̖��O����͂���
- ��ʂ��؂�ւ��̂�[Settings]��I��
- �ʂ̃E�B���h�E��Milkcocoa��HP�Ƀ��O�C�����āA�A�v���̐ݒ���J���āA[�F��]��I�сAAuth0�̃V�[�N���b�g�L�[���R�s�[���Ă���
- Auth0�̃y�[�W�ɖ߂�A�R�s�[�����V�[�N���b�g�L�[�𒣂�t����
- ���J�����y�[�W�ւ�URL��Allowed Callback URLs ��Allowed Origins (CORS) �ɓ��͂���
- [SAVE CHANGES]�ŕۑ�����
- ���̃��j���[����[Connections]������
- ���[�U�[���ƃp�X���[�h�ł̔F�؂��s���ꍇ
    - Database��I��
    - [+ NEW DATABASE CONNECTION]������
    - �C�ӂ̃f�[�^�x�[�X������͂���
- �\�[�V�������O�C�����g���ꍇ�́A[Social]���N���b�N
    - �g���������̂�L���ɂ��āASAVE
�ȏ�ŁAAuth0�̐ݒ�͊����B

- https://github.com/milk-cocoa/document/blob/master/examples/auth-auth0/index.html �ɃA�N�Z�X���āA�\�[�X�R�[�h�����O��index.html�ɓ\��t����
- var lock = new Auth0Lock()�̈������A�����œo�^����Domain��ClientID�ɕύX����
- new MilkCocoa()�̈������A�����̃A�v���̂��̂ɕύX




�Ǘ��҃��[�U�[���쐬
�Ǘ��f�[�^�͊Ǘ��҂̂݃A�N�Z�X�\�ɐݒ肷��
-�ݒ���@�������Ă���



