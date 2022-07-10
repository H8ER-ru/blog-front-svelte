<script>
import telegramImg from '$lib/assets/img/telegram.png'

</script>


<div class="error-placeholder">
  <p>Что-то пошло не так :(</p>
  <p>Пока можете читать посты в телеграме, он вряд ли упал</p>
  <a
    href="https://t.me/veras_it"
    target="_blank"
  >
    <span>https://t.me/veras_it</span>
    <img
      src={telegramImg}
      alt="Телеграм"
    >
  </a>
</div>

<style lang="sass">
  .error-placeholder
    height: 70vh
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    p
      margin-bottom: 10px
      font-size: 20px
      text-align: center
    img
      margin-top: 20px
      width: 100px
      height: 100px
    a
      font-size: 19px
      display: flex
      align-items: center
      flex-direction: column
      justify-content: center
</style>
