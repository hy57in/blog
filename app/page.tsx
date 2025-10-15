import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
       환영합니다! 🤍 😎 👩🏻‍💻
      </h1>
      <p className="mb-8">
        {`이곳은 프론트엔드 개발을 하며 마주한 문제들과 그 해결 과정, 그리고 배움을 기록하는 공간입니다. 가끔 개인적인 일상을 기록하는 일기장이 될 수도 있구요! 
        실무에서 겪은 경험과 기술적 인사이트를 공유하며, 함께 성장하는 개발자가 되고자 합니다.
        편하게 둘러보시고, 궁금한 점이나 의견이 있다면 언제든지 연락 주세요!`}
      </p>
      <div className="mb-8">
        <div className="mb-2 font-semibold text-lg tracking-tighter">Recent Posts</div>
        <BlogPosts />
      </div>
    </section>
  )
}
