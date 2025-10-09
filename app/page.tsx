import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hyojin Kim
      </h1>
      <p className="mb-8">
        {`안녕하세요, 프론트엔드 개발자 김효진입니다!
        어릴 적부터 기술을 통해 더 나은 삶을 만드는 것이 꿈이었고, 서비스 개발과 운영에 매력을 느껴 개발자가 되었습니다. 사용자와 가장 가깝게 맞닿아 있는 프론트엔드 영역에서 실질적인 가치를 만들어내는 것에 큰 보람을 느낍니다.`}
      </p>
      <div className="mb-8">
        <div className="mb-2 font-semibold text-lg tracking-tighter">Recent Posts</div>
        <BlogPosts />
      </div>
    </section>
  )
}
