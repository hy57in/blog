import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hyojin Kim
      </h1>
      <p className="mb-4">
        {`안녕하세요, 프론트엔드 개발자 김효진입니다!`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
