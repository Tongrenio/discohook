import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { Button } from "../../../common/input/Button"
import { InputField } from "../../../common/input/InputField"
import { ModalContext } from "../../../common/modal/ModalContext"
import { BaseModal } from "../../../common/modal/styles/BaseModal"
import { BaseModalBody } from "../../../common/modal/styles/BaseModalBody"
import { BaseModalFooter } from "../../../common/modal/styles/BaseModalFooter"
import { BaseModalHeader } from "../../../common/modal/styles/BaseModalHeader"
import { useRequiredContext } from "../../../common/state/useRequiredContext"
import type { Embed } from "../../message/Embed"
import { FlexContainer } from "../styles/FlexContainer"

const GalleryNotice = styled.div`
  margin: 8px;
  line-height: 1.375;
`

export type ImagesEditorModalProps = {
  embed: Embed
}

export function ImagesEditorModal(props: ImagesEditorModalProps) {
  const { embed } = props

  const modal = useRequiredContext(ModalContext)

  return useObserver(() => {
    const imageInputs = embed.gallery.map((image, index) => (
      <FlexContainer
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        flow="row"
      >
        <InputField
          id={`embed-${embed.id}-gallery-${index}`}
          value={image}
          onChange={url => {
            embed.gallery[index] = url
          }}
          label={`Image ${index + 1}`}
          validate={url =>
            /^https?:\/\//.test(url) ? undefined : "Invalid URL"
          }
        />
        <Button
          onClick={() => {
            embed.gallery.splice(index, 1)
          }}
        >
          Remove
        </Button>
      </FlexContainer>
    ))

    return (
      <BaseModal>
        <BaseModalHeader>Images</BaseModalHeader>
        <BaseModalBody>
          {imageInputs}
          {embed.gallery.length < 4 && (
            <FlexContainer flow="row">
              {embed.gallery.length >= 1 && !embed.url && (
                <GalleryNotice>
                  Adding up to 4 images is possible when this embed has a title
                  URL. Beware that every image after first will use up an
                  additional embed internally.
                </GalleryNotice>
              )}
              <Button
                disabled={embed.gallery.length >= 1 && !embed.url}
                onClick={() => {
                  embed.gallery.push("")
                }}
              >
                Add image
              </Button>
            </FlexContainer>
          )}
          <InputField
            id={`embed-${embed.id}-thumbnail`}
            value={embed.thumbnail}
            onChange={url => {
              embed.thumbnail = url
            }}
            label="Thumbnail"
            validate={url =>
              /^https?:\/\//.test(url) ? undefined : "Invalid URL"
            }
          />
        </BaseModalBody>
        <BaseModalFooter>
          <Button size="medium" onClick={() => modal.dismiss()}>
            Done
          </Button>
        </BaseModalFooter>
      </BaseModal>
    )
  })
}
