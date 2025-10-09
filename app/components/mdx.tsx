import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'

function Table({ data }: { data: { headers: string[], rows: string[][] } }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props: any) {
  let href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props: any) {
  // height가 없으면 width에 비례하여 자동 계산
  const { width, height, ...restProps } = props
  const finalHeight = height || Math.round(width * 0.6) // 기본 비율 5:3
  
  return <Image 
    alt={props.alt} 
    className="rounded-lg max-w-full h-auto" 
    width={width}
    height={finalHeight}
    style={{ maxWidth: '100%', height: 'auto' }}
    {...restProps} 
  />
}

function Code({ children, ...props }: { children: string, [key: string]: any }) {
  let codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    // 한국어, 일본어, 중국어 문자는 유지하고 특수문자만 제거
    .replace(/[^\w\u3131-\u3163\uac00-\ud7a3\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\-]+/g, '')
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: string }) => {
    let slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
}

export function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
