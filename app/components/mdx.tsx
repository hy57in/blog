import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'
import type { ComponentProps, ComponentPropsWithoutRef, ReactNode } from 'react'
import { getLinkKind } from './link-utils'
import { getTextContent, slugifyHeading } from './mdx-utils'

function Table({ data }: { data: { headers: string[], rows: string[][] } }) {
  const headers = data.headers.map((header) => (
    <th key={header}>{header}</th>
  ))
  const rows = data.rows.map((row) => (
    <tr key={row.join('|')}>
      {row.map((cell, cellIndex) => (
        <td key={`${data.headers[cellIndex] ?? 'cell'}:${cell}`}>{cell}</td>
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

function CustomLink({ href = '', children, ...props }: ComponentPropsWithoutRef<'a'>) {
  const linkKind = getLinkKind(href)

  if (linkKind === 'internal') {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  }

  if (linkKind === 'anchor') {
    return <a href={href} {...props}>{children}</a>
  }

  return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
}

type RoundedImageProps = Omit<ComponentProps<typeof Image>, 'alt' | 'width' | 'height'> & {
  alt: string
  width?: number
  height?: number
}

function RoundedImage(props: RoundedImageProps) {
  const { alt, width, height, ...restProps } = props
  const finalWidth = width ?? 800
  const finalHeight = height ?? Math.round(finalWidth * 0.6)
  
  return <Image 
    alt={alt}
    className="rounded-lg max-w-full h-auto" 
    width={finalWidth}
    height={finalHeight}
    style={{ maxWidth: '100%', height: 'auto' }}
    {...restProps} 
  />
}

function Code({ children, ...props }: ComponentPropsWithoutRef<'code'> & { children?: ReactNode }) {
  const code = getTextContent(children)
  const codeHTML = highlight(code)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: ReactNode }) => {
    const slug = slugifyHeading(children)
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

const components = {
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

export function CustomMDX(props: ComponentProps<typeof MDXRemote>) {
  const { components: providedComponents, ...restProps } = props
  const resolvedComponents = typeof providedComponents === 'function'
    ? providedComponents(components)
    : Object.assign({}, components, providedComponents)

  return (
    <MDXRemote
      {...restProps}
      components={resolvedComponents}
    />
  )
}
